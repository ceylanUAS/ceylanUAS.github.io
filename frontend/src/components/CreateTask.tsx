import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Dropdown, ProgressBar, Row, FormControl } from "react-bootstrap";
import { MouseEventHandler } from "react";
import "../style/CreateTask.css";

interface Props {
    getTask: (value: string) => void;
    taskValue: string;
    submit_task: MouseEventHandler<HTMLElement>;

    handleSave: MouseEventHandler<HTMLElement>;
    handleLoad: MouseEventHandler<HTMLElement>;
    deleteFromServer: MouseEventHandler<HTMLElement>;
    handleDeleteList: MouseEventHandler<HTMLElement>;
    isVisible: boolean;
}

export default function CreateTask(this: any, props: Props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [visible, setVisible] = useState(false);

    return (
        <>
            <Button className="nextButton" onClick={handleShow}>
                Create Task
            </Button>
            <Dropdown>
                <Dropdown.Toggle className="dropdwn" variant="primary" id="dropdown-basic-button">
                    Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={props.handleSave}>save </Dropdown.Item>
                    <Dropdown.Item onClick={props.handleLoad}>load</Dropdown.Item>
                    <Dropdown.Item onClick={props.deleteFromServer}>delete from server</Dropdown.Item>
                    <Dropdown.Item onClick={props.handleDeleteList}>delete local</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="task-label-sticker">
                        <Form.Control
                            type="text"
                            placeholder="Enter Task.."
                            onChange={(ev) => props.getTask(ev.currentTarget.value)}
                            value={props.taskValue}
                        />
                    </Form.Group>{" "}
                </Modal.Body>
                <Modal.Footer>
                    {props.isVisible ? <p className="message">Der Eintrag ist vorhanden!</p> : ""}
                    <Button id="btn" variant="create-tsk outline-primary task-btn" onClick={props.submit_task} value={props.taskValue}>
                        Create Task
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
