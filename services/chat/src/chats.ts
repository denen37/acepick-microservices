import { Server } from 'socket.io';
import { Emit, Listen } from './events';
import { sendMessage, ChatMessage, onDisconnect, getContacts, joinRoom, getMsgs } from './controllers/process';
import { verifyToken } from './middleware/verifyToken';
import { ChatRoom } from './models/ChatRoom';
import { Op } from 'sequelize';


export default function chatSocket(httpServer: any, URL?: string) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            credentials: true,
        },
    });

    global.onlineUsers = {}


    io.use(verifyToken);



    io.on(Listen.CONNECTION, async (socket) => {
        console.log(`User connected: ${socket.id}`);

        global.onlineUsers[socket.user.id] = socket.id

        const chatrooms = await ChatRoom.findAll({
            where: {
                members: {
                    [Op.like]: `%${socket.user.id}%`
                }
            }
        })

        chatrooms.forEach(async (chatroom) => {
            socket.join(chatroom.name)
        })


        socket.on(Listen.SEND_MSG, async (data: ChatMessage) => await sendMessage(io, socket, data));

        socket.on(Listen.DISCONNECT, () => onDisconnect(socket));

        socket.on(Listen.GET_CONTACTS, () => getContacts(io, socket));

        socket.on(Listen.JOIN_ROOM, (data: any) => joinRoom(io, socket, data))

        socket.on(Listen.GET_MSGs, (data: any) => getMsgs(io, socket, data))
    });


    return io;
}


