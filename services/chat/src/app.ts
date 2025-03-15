import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "./config/configSetup"
import chatSocket from "./chats"
// const URL = `http://localhost:${PORT}`

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Chat App Backend Running...");
});

chatSocket(server)

const PORT = config.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


