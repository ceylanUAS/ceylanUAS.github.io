import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import React from "react";
import "../style/NavbarApp.css";

function NavbarApp() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container className="navbar">
                    <Navbar.Brand className="nav-link" as={Link} to="/">
                        Home
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link" as={Link} to="/todo">
                            Todo
                        </Nav.Link>
                        <Nav.Link className="nav-link" as={Link} to="/sticker">
                            Sticker
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavbarApp;
