import { Server } from 'socket.io';
import { Emit, Listen } from './events';
import { sendMessage, ChatMessage, onDisconnect } from './controllers/process';


export default function chatSocket(httpServer: any, URL?: string) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            credentials: true,
        },
    });


    io.on(Listen.CONNECTION, (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on(Listen.SEND_MSG, async (data: ChatMessage) => await sendMessage(io, socket, data));

        socket.on(Listen.DISCONNECT, () => onDisconnect(socket));
    });


    return io;
}


