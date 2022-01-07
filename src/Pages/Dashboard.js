import { Fragment, useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Sidebar } from "../Components/Sidebar";
import { TopNav } from "../Components/TopNav";
import { api } from "../api";
export const Dashboard = () => {
    const [workgroups, setWorksgroups] = useState([]);
    useEffect(() => {
        api("/workgroups").then((w) => setWorksgroups(w));
    }, []);

    return (
        <Fragment>
            <TopNav />
            <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar workgroups={workgroups} />
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
