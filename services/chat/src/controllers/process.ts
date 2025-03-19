import { Server, Socket } from "socket.io";
import { Emit, Listen } from "../events";
import axios from "axios";
import config from "../config/configSetup"
import { Message } from "../models/Message";
import { ChatRoom } from "../models/ChatRoom";
import { Op } from "sequelize";
import { randomId } from "../utils/modules";

export interface ChatMessage {
    to: string;
    from: string;
    text: string;
    room: string;
}

export const sendMessage = async (io: Server, socket: Socket, data: ChatMessage) => {

    let room = await ChatRoom.findOne({
        where: {
            name: data.room
        }
    })

    if (!room) {
        return
    }

    const message = await Message.create({
        text: data.text,
        from: data.from,
        timestamp: new Date(),
        chatroomId: room?.id
    })

    io.to(room.name).emit(Emit.RECV_MSG, { ...data, timestamp: message.timestamp });
}


export const onDisconnect = async (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);
}

export const getContacts = async (io: Server, socket: Socket) => {
    let token = socket.handshake.auth.token;
    const user = socket.user;

    if (!user) {
        return
    }

    if (user.role === 'client') {
        const result = await axios.get(`${config.AUTH_BASE_URL}/api/profiles/get_professionals`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const contacts = result.data.data;

        socket.emit(Emit.ALL_CONTACTS, contacts);
    }
}

export const joinRoom = async (io: Server, socket: Socket, data: any) => {

    console.log("join room", data);
    //get the ids
    let room = await ChatRoom.findOne({
        where: {
            [Op.and]: [{
                members: {
                    [Op.like]: `%${socket.user.id}%`
                }
            }, {
                members: {
                    [Op.like]: `%${data.contactId}%`
                }
            }],

        }
    })


    if (!room) {
        room = await ChatRoom.create({
            name: randomId(12),
            members: `${socket.user.id},${data.contactId}`
        })
    }

    const existingRoom = io.of("/").adapter.rooms.get(room.name);

    if (!existingRoom?.has(socket.id))
        socket.join(room.name);

    const sid = onlineUsers[data.contactId];

    if (sid && !existingRoom?.has(sid)) {
        const userSocket = io.sockets.sockets.get(sid);

        userSocket?.join(room.name);
    }

    io.to(room.name).emit(Emit.JOINED_ROOM, room.name);
    console.log("joined room", room.name);
}

export const getMsgs = async (io: Server, socket: Socket, data: any) => {
    const chatroom = await ChatRoom.findOne({
        where: {
            name: data.room
        },
        include: [{
            model: Message,
        }]
    })

    const members = chatroom?.members.split(",");

    const normalizedMessages: any[] = []

    chatroom?.messages.forEach((msg) => {
        normalizedMessages.push({
            to: members?.filter((member) => member !== msg.from)[0],
            from: msg.from,
            text: msg.text,
            timestamp: msg.timestamp,
        })
    })

    io.to(data.room).emit(Emit.RECV_MSGs, normalizedMessages);
}