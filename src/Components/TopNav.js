import { Container, Navbar, Nav } from "react-bootstrap";
import "./TopNav.css";

export const TopNav = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Elearning</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <img
                        src="https://www.w3schools.com/howto/img_avatar2.png"
                        alt="Avatar"
                        className="avatar"
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
