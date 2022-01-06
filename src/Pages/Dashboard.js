import { Fragment } from "react";
import {
    Button,
    Container,
    Card,
    Row,
    Col,
    Navbar,
    Nav,
} from "react-bootstrap";
import { Sidebar } from "../Components/Sidebar";

export const Dashboard = () => {
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar workgroups={["aaa", "bbb", "cccc"]} />
                <Container>
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Col>
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src="holder.js/100px160"
                                    />
                                    <Card.Body>
                                        <Card.Title>Card title</Card.Title>
                                        <Card.Text>
                                            This is a longer card with
                                            supporting text below as a natural
                                            lead-in to additional content. This
                                            content is a little bit longer.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};
