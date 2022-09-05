import { Col, Container, Form, Row } from "react-bootstrap";
import "../style/Sticker.css";
import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { decodedTextSpanIntersectsWith } from "typescript";

function Sticker() {
    interface ListItem {
        id: number;
        text: string;
        createDate: string;
        done: boolean;
    }

    let [taskValue, setTaskValue] = useState<string>("");
    let [sticker, setSticker] = useState<ListItem[]>([]);
    let [visible, setVisible] = useState(false);

    async function submit_task() {
        // const response = await fetch("http://localhost:4000/time");
        // console.log(time);
        setVisible(false);

        for (let key of sticker) {
            console.log(key);
            if (key.text === taskValue) {
                console.log("Der Eintrag ist bereits vorhanden");
                setVisible(true);
                return;
            }
        }

        let dataArray: ListItem[] = sticker;
        dataArray.push({
            id: Date.now(),
            text: taskValue,
            createDate: new Date().toLocaleDateString() + ", ",
            done: false,
        });
        // let list_ = sticker.map((value, ix) => {
        setTaskValue("");

        // });

        setSticker(sticker);
    }

    function getTask(value: string) {
        if (value.length < 40) {
            setTaskValue(value);
            // const controlDown = (event: KeyboardEvent) => {
            setVisible(false);

            //     if (event.key === "Enter") {
            //         console.log(event.key);
            //         submit_task();
            //     }
            // };
            // window.addEventListener("keydown", controlDown);
        }
    }

    function changeColor(input: number) {
        let list_ = sticker.map((value, ix) => {
            if (ix !== input) {
                return value;
            } else {
                const obj = value;
                obj.done = !obj.done;
                return obj;
            }
        });
        setSticker(list_);
    }

    function handleDeleteSticker(input: number) {
        setSticker(
            sticker.filter((value, ix) => {
                if (input !== ix) {
                    return value;
                }
            })
        );
    }
    function handleDeleteList() {
        setSticker([]);
    }

    function createSticker() {
        return sticker.map((val, ix) => {
            return (
                <div className={"sticker-card" + (val.done ? " done" : "")} key={ix}>
                    <h4> Task {ix + 1}</h4>
                    <div className={"value-card"}>
                        {val.text}
                        <input type="checkbox" className="valueButton" id="check" onChange={() => changeColor(ix)} />
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                                onClick={() => handleDeleteSticker(ix)}
                            >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                            </svg>{" "}
                        </span>
                    </div>
                </div>
            );
        });
    }

    async function handleLoad() {
        const response = await fetch("http://localhost:4000/liste");
        //JSON.parse = um ein json string in ein javascript objekt umzuwandeln
        const obj = JSON.parse(await response.text());
        console.log(obj);
        setSticker(obj.content);
    }

    async function handleSave() {
        const response = await fetch("http://localhost:4000/liste", {
            headers: { "Content-Type": "application/json" },
            method: "post",
            body: JSON.stringify({ content: sticker }),
        });

        if (response.ok) {
            console.log("liste gespeichert");
        } else {
            console.log("liste konnte nicht gespeichert werden");
        }
    }

    async function deleteFromServer() {
        const response = await fetch("http://localhost:4000/liste", {
            headers: { "Content-Type": "application/json" },
            method: "delete",
        });
        setSticker([]);
    }

    return (
        <Container>
            <Row className="row-sticker">
                <Col className="sticker-header">
                    <h1 className="desc">Todo Sticker App</h1>
                    <Form.Group className="task-label">
                        {" "}
                        <CreateTask
                            getTask={getTask}
                            taskValue={taskValue}
                            submit_task={submit_task}
                            handleSave={handleSave}
                            handleLoad={handleLoad}
                            handleDeleteList={handleDeleteList}
                            deleteFromServer={deleteFromServer}
                            isVisible={visible}
                        ></CreateTask>
                    </Form.Group>{" "}
                </Col>
            </Row>

            <Row className="row-sticker">
                <Col className="output-sticker">{createSticker()}</Col>
            </Row>
        </Container>
    );
}

export default Sticker;
