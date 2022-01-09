import { useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Modal, Dropdown, Button } from "react-bootstrap";
import { makeAssignment } from "../models/assignment";
export function CreateAssignmentModal(props) {
    // Assignment State
    const [assignmentName, setAssignmentName] = useState();
    const [assignmentState, setAssignmentState] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    function handleAssignmentState(e) {
        e.preventDefault();
        console.log(e);
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Assignment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Assignment Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Assignment 1"
                            onChange={(e) => setAssignmentName(e.target.value)}
                            value={assignmentName}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Assignment State</Form.Label>

                        <Form.Select
                            aria-label="Default select example"
                            onChange={setAssignmentState}
                        >
                            <option>Select State</option>
                            <option value="PROPOSED">Proposed</option>
                            <option value="IN_EXECUTION">In execution</option>
                            <option value="COMPLETED">Completed</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start date</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End date</Form.Label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() =>
                        props.saveAssignment(
                            makeAssignment(
                                assignmentName,
                                assignmentState,
                                startDate,
                                endDate
                            )
                        )
                    }
                >
                    Save Assignment
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
