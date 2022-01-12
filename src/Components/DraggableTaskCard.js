import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";

import "./DraggableTaskCard.css";

import { FaPencilAlt, FaSave } from "react-icons/fa";

export function DraggableTaskCard(props) {
    const [editingState, setEditing] = useState(props.task.editing);
    const [value, setValue] = useState();

    function onChange(e) {
        setValue(e.target.value);
    }

    return (
        <div
            className="card"
            onClick={props.onClick}
            {...props}
            ref={props.innerRef}
        >
            {!editingState && (
                <p style={{ margin: 0, textAlign: "left" }}>
                    {props.task.tskDescription}
                </p>
            )}
            {!editingState && (
                <div className="editing" onClick={() => setEditing(true)}>
                    <FaPencilAlt />
                </div>
            )}
            {editingState && (
                <Fragment>
                    <input
                        type="text"
                        onChange={onChange}
                        value={value || props.task.tskDescription}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            setEditing(false);
                            props.setDescription(
                                value || props.task.tskDescription
                            );
                        }}
                    >
                        <FaSave />
                    </Button>
                </Fragment>
            )}
        </div>
    );
}
