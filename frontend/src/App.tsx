import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import Home from "./components/Home";
import Sticker from "./components/Sticker";
import TodoForm from "./components/TodoForm";

export default function App() {
    return (
        <>
            <NavbarApp></NavbarApp>
            <Container fluid className="my-container">
                <Routes>
                    <Route path="/todo" element={<TodoForm />} />
                    <Route path="/sticker" element={<Sticker />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Container>
        </>
    );
}
