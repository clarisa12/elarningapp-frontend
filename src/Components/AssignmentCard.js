import { useState } from "react";
import { Nav, Card } from "react-bootstrap";

export const AssignmentCard = ({ assignment }) => {
    return (
        <Card key={assignment.assigId}>
            <Card.Body>
                <Card.Title>{assignment.assigName}</Card.Title>
                <Card.Text>{assignment.assigState}</Card.Text>
            </Card.Body>
        </Card>
    );
};
