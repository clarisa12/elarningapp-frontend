import { Container, Navbar, Nav } from "react-bootstrap";
import "./TopNav.css";

export const TopNav = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Elearning</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <img
                        src="https://www.w3schools.com/howto/img_avatar2.png"
                        alt="Avatar"
                        class="avatar"
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
