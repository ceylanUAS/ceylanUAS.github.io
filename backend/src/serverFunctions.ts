import promises from "fs/promises";

export async function getSticker(req: any, res: any) {
    const data: string = await promises.readFile("./data/sticker.json", {
        encoding: "utf-8",
    });
    console.log("get request on /liste");
    //für button "laden"
    res.send(data);
}
export async function postSticker(req: any, res: any) {
    await promises.writeFile("./data/sticker.json", JSON.stringify(req.body), {
        encoding: "utf-8",
    });
    console.log("sending");
    res.send("sending");
}
export async function deleteSticker(req: any, res: any) {
    await promises.writeFile("./data/sticker.json", JSON.stringify({ content: [] }), {
        encoding: "utf-8",
    });
    console.log("inhalt gelöscht");
    res.send("inhalt von sticker.json wurde gelöscht");
}

//todoform
export async function getToDo(req: any, res: any) {
    const data: string = await promises.readFile("./data/todo.json", {
        encoding: "utf-8",
    });
    console.log("get request on /todo");
    //für button "laden"
    res.send(data);
}
export async function postToDo(req: any, res: any) {
    await promises.writeFile("./data/todo.json", JSON.stringify(req.body), {
        encoding: "utf-8",
    });
    console.log("sending");
    res.send("sending");
}

export async function deletetodo(req: any, res: any) {
    await promises.writeFile("./data/todo.json", JSON.stringify({ content: [] }), {
        encoding: "utf-8",
    });
    console.log("inhalt gelöscht");
    res.send("inhalt von todo.json wurde gelöscht");
}
