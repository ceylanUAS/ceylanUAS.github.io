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
exports.deletetodo = exports.postToDo = exports.getToDo = exports.deleteSticker = exports.postSticker = exports.getSticker = void 0;
const promises_1 = __importDefault(require("fs/promises"));
function getSticker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile("./data/sticker.json", {
            encoding: "utf-8",
        });
        console.log("get request on /liste");
        //für button "laden"
        res.send(data);
    });
}
exports.getSticker = getSticker;
function postSticker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile("./data/sticker.json", JSON.stringify(req.body), {
            encoding: "utf-8",
        });
        console.log("sending");
        res.send("sending");
    });
}
exports.postSticker = postSticker;
function deleteSticker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile("./data/sticker.json", JSON.stringify({ content: [] }), {
            encoding: "utf-8",
        });
        console.log("inhalt gelöscht");
        res.send("inhalt von sticker.json wurde gelöscht");
    });
}
exports.deleteSticker = deleteSticker;
//todoform
function getToDo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile("./data/todo.json", {
            encoding: "utf-8",
        });
        console.log("get request on /todo");
        //für button "laden"
        res.send(data);
    });
}
exports.getToDo = getToDo;
function postToDo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile("./data/todo.json", JSON.stringify(req.body), {
            encoding: "utf-8",
        });
        console.log("sending");
        res.send("sending");
    });
}
exports.postToDo = postToDo;
function deletetodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile("./data/todo.json", JSON.stringify({ content: [] }), {
            encoding: "utf-8",
        });
        console.log("inhalt gelöscht");
        res.send("inhalt von todo.json wurde gelöscht");
    });
}
exports.deletetodo = deletetodo;
