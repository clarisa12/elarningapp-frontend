import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";

import "./DraggableTaskCard.css";

import { FaPencilAlt, FaSave } from "react-icons/fa";

export function Workgroup(props) {
    const [editingState, setEditing] = useState(props.editing);
    const [value, setValue] = useState();

    function onChange(e) {
        setValue(e.target.value);
    }

    return (
        <div
            onClick={() => props.onWgChange(props.wg)}
            key={props.wg.wrkId}
            className={`wg-container ${
                props.selectedWg && props.wg.wrkID === props.selectedWg.wrkId
                    ? "selected"
                    : ""
            }`}
            onClick={props.onClick}
            {...props}
            ref={props.innerRef}
        >
            {!editingState && (
                <p style={{ margin: 0, textAlign: "left" }}>
                    {props.task.description}
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
                        value={value || props.description}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            setEditing(false);
                            props.setDescription(value || props.name);
                        }}
                    >
                        <FaSave />
                    </Button>
                </Fragment>
            )}
        </div>
    );
}
