import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Modal } from "react-bootstrap";
import "../style/TodoForm.css";

/**
 *
 *
 * @export
 * @return {*}
 */
export default function TodoForm() {
    interface ListItem {
        id: number;
        text: string;
        createDate: string; //Wie bekommt man das aktuelle Datum?
        done: boolean;
    }

    let [inputValue, setInputValue] = useState<string>("");
    let [list, setList] = useState<ListItem[]>([]);
    let [visible, setVisible] = useState(false);
    const handleClose = () => setVisible(false);

    /**
     *
     *
     * @return {*}
     */
    async function onClick_output() {
        //fetch sendet request an den server
        // const response = await fetch("http://localhost:4000/time");
        // const time: string = await response.text();
        // console.log(time);

        setVisible(false);

        for (let key of list) {
            console.log(key);
            if (key.text === inputValue) {
                console.log("Der Eintrag ist bereits vorhanden");
                setVisible(true);
                return;
            }
        }
        let dataArray: ListItem[] = list;
        dataArray.push({
            id: Date.now(),
            text: inputValue,
            createDate: new Date().toLocaleDateString() + ", ",
            done: false,
        });

        setInputValue("");
        setList(list);
    }
    /**
     *
     *
     * @param {number} input
     */
    function handleDeleteItem(input: number) {
        // let tempState: string[] = outputValue.concat();
        // tempState.splice(input, 1);
        setList(
            list.filter((value, ix) => {
                if (input !== ix) {
                    return value;
                }
            })
        );
    }
    /**
     *This function deletes the tasks local.
     *
     */
    function handleDeleteList() {
        setList([]);
    }
    /**
     *This function deletes the tasks in the server.
     *
     */
    async function deleteFromServer() {
        const response = await fetch("http://localhost:4000/todo", {
            headers: { "Content-Type": "application/json" },
            method: "delete",
        });
        const resp_string = await response.text();
        setList([]);
    }
    /**
     *
     *
     */
    async function handleSave() {
        const response = await fetch("http://localhost:4000/todo", {
            headers: { "Content-Type": "application/json" },
            method: "post",
            body: JSON.stringify({ content: list }),
        });

        if (response.ok) {
            console.log("liste gespeichert");
        } else {
            console.log("liste konnte nicht gespeichert werden");
        }
    }
    /**
     *
     *
     */
    async function handleLoad() {
        const response = await fetch("http://localhost:4000/todo");
        //JSON.parse = um ein json string in ein javascript objekt umzuwandeln
        const obj = JSON.parse(await response.text());
        console.log(obj);
        setList(obj.content);
    }
    /**
     *
     *
     * @param {string} value
     */
    function getData(value: string) {
        if (value.length < 30) {
            setInputValue(value);
        }
    }
    /**
     *
     *
     * @param {number} input
     */
    function changeColor(input: number) {
        let list_ = list.map((value, ix) => {
            if (ix !== input) {
                return value;
            } else {
                const obj = value;
                obj.done = !obj.done;
                return obj;
            }
        });
        setList(list_);
    }
    /**
     *
     *
     * @return {*}
     */
    function output() {
        return list.map((val, ix) => {
            return (
                <div className={"out" + (val.done ? " done" : "")} key={ix}>
                    <div className={"value"}>
                        <p>{ix + 1}: &nbsp;</p>
                        {val.text}{" "}
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                                onClick={() => handleDeleteItem(ix)}
                            >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                            </svg>{" "}
                        </span>
                        <input type="checkbox" className="valueButton" onChange={() => changeColor(ix)} />
                    </div>{" "}
                </div>
            );
        });
    }

    return (
        <>
            <Container className="task-feld">
                <Row className="todo-enter-label">
                    <h1>Todo App</h1>
                    <Col className="control-col">
                        <Form.Control
                            className="enter-label"
                            type="text"
                            placeholder="Enter.."
                            onChange={(ev) => getData(ev.currentTarget.value)}
                            value={inputValue}
                        />
                    </Col>
                    <Col>
                        <Button className="submit" type="submit" onClick={onClick_output} value={inputValue}>
                            +
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="output-col" id="down">
                        {output()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id="down-btn">
                            <button className="bottom-label" onClick={handleSave} id="check">
                                save
                            </button>
                            <button className="bottom-label" onClick={handleLoad}>
                                load{" "}
                            </button>{" "}
                        </div>
                    </Col>
                    <Col>
                        {" "}
                        <div id="down-btn2">
                            <button className="bottom-label" onClick={deleteFromServer} id="check">
                                delete server
                            </button>
                            <button className="bottom-label" onClick={() => handleDeleteList()}>
                                delete local{" "}
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={visible} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Falsche Eingabe</Modal.Title>
                </Modal.Header>
                <Modal.Body>Der Eintrag ist bereits vorhanden!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
