import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { TopNav } from "../Components/TopNav";
import { api } from "../api";
import { TaskCard } from "../Components/TaskCard";

const proposed = "PROPOSED";
const inExecution = "IN_EXECUTION";
const completed = "COMPLETED";

export const AssignmentDetail = () => {
    const [tasks, setTasks] = useState({
        [proposed]: [],
        [inExecution]: [],
        [completed]: [],
    });
    const [assig, setAssig] = useState();

    const assigId = window.location.pathname.split("/").pop();

    // useEffect(() => {
    //     api.get(`/assignments/${assigId}`).then((assig) => {
    //         setAssig(assig);
    //         setTasks(assig.assigTasks);
    //     });
    // }, []);

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

    function startTask(state) {
        setTasks({
            ...tasks,
            [state]: [
                ...tasks[state],
                { tskState: state, editing: true, description: "", _id: id() },
            ],
        });
    }

    function setDescription(state, id) {
        return (description) => {
            const t1 = tasks[state].filter((t) => t._id !== id);
            const item = tasks[state].find((t) => t._id === id);
            item.description = description;
            item.editing = false;
            setTasks({
                ...tasks,
                [state]: [...t1, item],
            });
        };
    }

    function id() {
        return Date.now();
    }

    return (
        <Fragment>
            <TopNav />
            <Container style={{ marginTop: "24px" }}>
                <h2>{}</h2>
                <Row md={3} className="g-4">
                    <Col style={{ borderRight: "2px dotted #eee" }}>
                        <h3>Assigned</h3>
                        {tasks["PROPOSED"].map((t) => (
                            <TaskCard
                                setDescription={setDescription(proposed, t._id)}
                                description={t.description}
                                editing={t.editing}
                            />
                        ))}
                        <TaskCard
                            description="+"
                            canEdit={false}
                            onClick={() => startTask(proposed)}
                        />
                    </Col>
                    <Col style={{ borderRight: "2px dotted #eee" }}>
                        <h3>In Progress</h3>
                        {tasks[inExecution].map((t) => (
                            <TaskCard
                                setDescription={setDescription(
                                    inExecution,
                                    t._id
                                )}
                                description={t.description}
                                editing={t.editing}
                            />
                        ))}
                        <TaskCard
                            description="+"
                            canEdit={false}
                            onClick={() => startTask(inExecution)}
                        />
                    </Col>
                    <Col>
                        <h3>Completed</h3>
                        {tasks[completed].map((t) => (
                            <TaskCard
                                setDescription={setDescription(
                                    completed,
                                    t._id
                                )}
                                description={t.description}
                                editing={t.editing}
                            />
                        ))}
                        <TaskCard
                            description="+"
                            canEdit={false}
                            onClick={() => startTask(completed)}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
