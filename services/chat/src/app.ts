import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "./config/configSetup"
import chatSocket from "./chats"
import db from "./config/db";
import path from "path";
// const URL = `http://localhost:${PORT}`

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use("chat/uploads", express.static(path.join(__dirname, "../public/uploads")))

app.use(cors());
app.use(express.json());

app.get("/chat", (req, res) => {
    res.send("Chat App Backend Running...");
});

chatSocket(server)

const PORT = config.PORT || 5000;
const HOST = config.HOST || "localhost";

db.sync({ alter: true }).then(() => {
    server.listen(PORT, HOST, () => {
        console.log(`Server running on port http://${HOST}:${PORT}`);
    });
})
    .catch((err: any) => console.error('Error connecting to the database', err));
