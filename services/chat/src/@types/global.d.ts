declare global {
    namespace NodeJS {
        interface Global {
            onlineUsers: { [key: string]: string };
        }
    }

    var onlineUsers: { [key: string]: string };

    // var roomUsers: { [room: string]: string[] }
}

export { };
