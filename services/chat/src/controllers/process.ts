import { Server, Socket } from "socket.io";
import { Emit, Listen } from "../events";
import axios from "axios";
import config from "../config/configSetup"
import { Message } from "../models/Message";
import { ChatRoom } from "../models/ChatRoom";
import { Op } from "sequelize";
import { randomId } from "../utils/modules";
import http from "http";
import path from "path";
import fs from "fs";
import { decryptMessage, encryptMessage } from "../utils/secret";

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
        text: encryptMessage(data.text),
        from: data.from,
        timestamp: new Date(),
        chatroomId: room?.id
    })

    io.to(room.name).emit(Emit.RECV_MSG, { ...data, timestamp: message.timestamp });
}


export const onDisconnect = async (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);

    delete global.onlineUsers[socket.user.id]
}

export const getContacts = async (io: Server, socket: Socket) => {
    let token = socket.handshake.auth.token;
    const user = socket.user;

    if (!user) {
        return
    }

    if (user.role === 'client') {
        const result = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/get_professionals`, {}, {
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
            text: decryptMessage(msg.text),
            timestamp: msg.timestamp,
        })
    })

    io.to(data.room).emit(Emit.RECV_MSGs, normalizedMessages);
}

export const getPrevChats = async (io: Server, socket: Socket, data: any) => {

    const chatrooms = await ChatRoom.findAll({
        where: {
            members: {
                [Op.like]: `%${socket.user.id}%`
            }
        }
    });

    const partners = chatrooms.map((room) => {
        const members = room.members.split(",");
        return members.filter((member) => member !== socket.user.id)[0];
    })



    const result = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/get_professionals`,
        { userIds: partners },
        {
            headers: {
                Authorization: `Bearer ${socket.handshake.auth.token}`
            }
        }
    )

    const prevChats = result.data.data.map((member: any) => {
        return {
            ...member, online: Boolean(global.onlineUsers[member.user.id])
        }
    })

    socket.emit(Emit.GOT_PREV_CHATS, prevChats);
}


export const uploadFile = async (io: Server, socket: Socket, data: any) => {
    const { image, fileName } = data;
    const uploadDir = path.join(__dirname, "../../public/uploads");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const fileExt = path.extname(fileName).toLowerCase();

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const documentExtensions = [".pdf", ".doc", ".docx", ".txt", ".xlsx"];

    let tag = ""
    if (imageExtensions.includes(fileExt)) {
        tag = '<img>'
    } else if (documentExtensions.includes(fileExt)) {
        tag = '<doc>'
    }

    const filePath = path.join(uploadDir, `${Date.now()}-${fileName}`);

    fs.writeFile(filePath, Buffer.from(image), async (err) => {
        if (err) {
            console.error("Error saving image:", err);
            return;
        }

        const imageUrl = `http://${config.HOST}:${config.PORT}/uploads/${path.basename(filePath)}`;
        console.log(`Image saved and broadcasted: ${imageUrl}`);

        let room = await ChatRoom.findOne({
            where: {
                name: data.room
            }
        })

        if (!room) {
            return
        }

        let url = `${tag}${imageUrl}`

        const message = await Message.create({
            text: encryptMessage(url),
            from: data.from,
            timestamp: new Date(),
            chatroomId: room?.id
        })

        io.to(room.name).emit(Emit.RECV_FILE, { ...message.dataValues, text: url });
    });
}