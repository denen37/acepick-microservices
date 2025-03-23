import { Server } from 'socket.io';
import { Emit, Listen } from './events';
import { sendMessage, ChatMessage, onDisconnect, getContacts, joinRoom, getMsgs, getPrevChats, uploadFile } from './controllers/process';
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

        socket.on("offer", (offer: any) => socket.broadcast.emit("offer", offer));

        socket.on("answer", (answer: any) => socket.broadcast.emit("answer", answer));

        socket.on("candidate", (candidate: any) => socket.broadcast.emit("candidate", candidate))

        socket.emit(Emit.CONNECTED, socket.id)

        socket.on(Listen.UPLOAD_FILE, (data: any) => uploadFile(io, socket, data));

        socket.on(Listen.SEND_MSG, async (data: ChatMessage) => await sendMessage(io, socket, data));

        socket.on(Listen.DISCONNECT, () => onDisconnect(socket));

        socket.on(Listen.GET_CONTACTS, () => getContacts(io, socket));

        socket.on(Listen.JOIN_ROOM, (data: any) => joinRoom(io, socket, data))

        socket.on(Listen.GET_MSGs, (data: any) => getMsgs(io, socket, data))

        socket.on(Listen.PREV_CHATS, (data: any) => getPrevChats(io, socket, data))
    });


    return io;
}


