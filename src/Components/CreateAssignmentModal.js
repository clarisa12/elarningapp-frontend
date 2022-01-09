import { useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Modal, Dropdown, Button } from "react-bootstrap";
import { makeAssignment } from "../models/assignment";
export function CreateAssignmentModal(props) {
    // Assignment State
    const [name, setName] = useState();
    const [assigState, setAssigState] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    function clear() {
        setName("");
        setAssigState(null);
        setStartDate();
        setEndDate();
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Assignment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Assignment Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Assignment 1"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Assignment State</Form.Label>
                        <Form.Select
                            onChange={(e) => setAssigState(e.target.value)}
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
                <Button
                    variant="secondary"
                    onClick={() => {
                        clear();
                        props.handleClose();
                    }}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        clear();
                        props.saveAssignment(
                            makeAssignment(name, assigState, startDate, endDate)
                        );
                    }}
                >
                    Save Assignment
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
