import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Sidebar } from "../Components/Sidebar";
import { TopNav } from "../Components/TopNav";
import { api } from "../api";
import { AssignmentCard } from "../Components/AssignmentCard";
import { CreateAssignmentModal } from "../Components/CreateAssignmentModal";
import { Link } from "react-router-dom";

export const Dashboard = () => {
    const [workgroups, setWorksgroups] = useState([]);
    const [selectedWg, setSelectedWg] = useState(null);

    // Create Assignment Modal
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        api.get("/workgroups").then((w) => setWorksgroups(w));
    }, []);

    function onWgChange(wg) {
        if (wg.editing) return;
        setSelectedWg(wg);

        api.get(`/workgroups/${wg.wrkId}`).then(({ wrkAssig }) =>
            setAssignments(wrkAssig)
        );
    }

    function createWg() {
        setWorksgroups([
            ...workgroups,
            {
                _id: Date.now(),
                wrkName: "",
                wrkList: null,
                wrkAssig: null,
                editing: true,
            },
        ]);
    }

    function saveWg(wg) {
        const id = wg._id || wg.wrkId;
        const key = wg._id ? "_id" : "wrkId";
        const item = workgroups.find((w) => w[key] === id);
        const other = workgroups.filter((w) => w[key] !== id);

        item.wrkName = wg.wrkName;
        setWorksgroups([...other, item]);

        if (wg.wrkId) {
            api.put(`/workgroups/${wg.wrkId}`, wg).then(console.log);
        } else {
            api.post("/workgroups", wg).then(console.log);
        }
    }

    function closeAssignmentModal() {
        setShowAssignmentModal(false);
    }

    function saveAssignment(newAssig) {
        // api.post("/assignments", { ...newAssig, assigWorkgroup: selectedWg })
        //     .then(
        api.put(`/workgroups/${selectedWg.wrkId}`, {
            ...selectedWg,
            wrkAssig: [...selectedWg.wrkAssig, newAssig],
        })
            // )
            .then((wg) => {
                setSelectedWg(wg);
                setAssignments(wg.wrkAssig);
                closeAssignmentModal(false);
            })
            .catch((e) => console.error(e));
    }

    return (
        <Fragment>
            <TopNav />
            <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar
                    saveWg={saveWg}
                    createWg={createWg}
                    onWgChange={onWgChange}
                    workgroups={workgroups}
                    selectedWg={selectedWg}
                />
                <CreateAssignmentModal
                    show={showAssignmentModal}
                    saveAssignment={saveAssignment}
                    handleClose={closeAssignmentModal}
                />
                <Container style={{ marginTop: "24px" }}>
                    <Row xs={1} md={3} className="g-4">
                        {!selectedWg && (
                            <h1 style={{ margin: "60px auto" }}>
                                Nothing to show, select a workgroup
                            </h1>
                        )}
                        {selectedWg && (
                            <Col>
                                <Card
                                    onClick={() => setShowAssignmentModal(true)}
                                >
                                    <Card.Body>
                                        <Card.Title>
                                            Create Assignment
                                        </Card.Title>
                                        <Card.Text>+</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}

                        {assignments.map((a) => (
                            <Col>
                                <Link to={`/assignment/${a.assigId}`}>
                                    <AssignmentCard assignment={a} />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};
