import cors from "cors";
import express from "express";
import promises from "fs/promises";
import { deleteSticker, deletetodo, getSticker, getToDo, postSticker, postToDo } from "./serverFunctions";

export default class Server {
    private app = express();
    private port;

    protected constructor(port: number) {
        this.port = port;
    }

    public static async initServer(port: number) {
        const server = new Server(port);
        await server.configServer();
        return server;
    }

    public async configServer() {
        this.app.use(cors({ origin: "http://localhost:3000" }));
        this.app.use(express.json());
        //sticker
        this.app.get("/liste", getSticker);
        this.app.post("/liste", postSticker);

        this.app.delete("/liste", deleteSticker);

        //todoform
        this.app.get("/todo", getToDo);
        this.app.post("/todo", postToDo);

        this.app.delete("/todo", deletetodo);

        this.app.listen(this.port, () => {
            console.log(`connected to port ${this.port}`);
        });
    }
}
