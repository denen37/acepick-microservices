import { Server, Socket } from "socket.io";
import { Emit, Listen } from "../events";

export interface ChatMessage {
    to: number;
    from: number;
    text: string;
}

export const sendMessage = async (io: Server, socket: Socket, data: ChatMessage) => {
    // const message = await Message.create(data);
    console.log(data)
    io.emit(Emit.RECV_MSG, data);
}


export const onDisconnect = async (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);
}