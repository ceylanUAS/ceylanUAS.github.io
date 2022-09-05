"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const serverFunctions_1 = require("./serverFunctions");
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
    }
    static initServer(port) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = new Server(port);
            yield server.configServer();
            return server;
        });
    }
    configServer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
            this.app.use(express_1.default.json());
            //sticker
            this.app.get("/liste", serverFunctions_1.getSticker);
            this.app.post("/liste", serverFunctions_1.postSticker);
            this.app.delete("/liste", serverFunctions_1.deleteSticker);
            //todoform
            this.app.get("/todo", serverFunctions_1.getToDo);
            this.app.post("/todo", serverFunctions_1.postToDo);
            this.app.delete("/todo", serverFunctions_1.deletetodo);
            this.app.listen(this.port, () => {
                console.log(`connected to port ${this.port}`);
            });
        });
    }
}
exports.default = Server;
