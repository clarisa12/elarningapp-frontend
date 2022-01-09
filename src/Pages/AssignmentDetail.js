import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { TopNav } from "../Components/TopNav";
import { api } from "../api";
import { TaskCard } from "../Components/TaskCard";

export const AssignmentDetail = () => {
    const [tasks, setTasks] = useState();
    const [assig, setAssig] = useState();

    const assigId = window.location.pathname.split("/").pop();

    useEffect(() => {
        api.get(`/assignments/${assigId}`).then((assig) => {
            setAssig(assig);
            setTasks(assig.assigTasks);
        });
    }, []);

    function updateTaskState(newTask) {
        api.put(`/task/${newTask.tskId}`, newTask).then(() => {
            console.log("success");
        });
    }

    function createTask(newTask) {
        api.post(`/assignments/${assigId}`, newTask).then(() => {
            console.log("success");
        });
    }

    function startTask(taskState) {}

    return (
        <Fragment>
            <TopNav />
            <Container style={{ marginTop: "24px" }}>
                <h2>{}</h2>
                <Row md={3} className="g-4">
                    <Col style={{ borderRight: "2px dotted #eee" }}>
                        <h3>Assigned</h3>
                        <TaskCard
                            description="+"
                            canEdit={false}
                            onClick={() => startTask("PROPOSED")}
                        />
                    </Col>
                    <Col style={{ borderRight: "2px dotted #eee" }}>
                        <h3>In Progress</h3>
                        <TaskCard
                            description="+"
                            canEdit={false}
                            onClick={() => startTask("IN_EXECUTION")}
                        />
                    </Col>
                    <Col>
                        <h3>Completed</h3>
                        <TaskCard
                            description="+"
                            canEdit={false}
                            onClick={() => startTask("COMPLETED")}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
