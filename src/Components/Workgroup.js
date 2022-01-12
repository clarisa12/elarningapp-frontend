import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";

import "./Workgroup.css";

import { FaPencilAlt, FaSave } from "react-icons/fa";

export function Workgroup(props) {
    const [editingState, setEditing] = useState(props.wg.editing);
    const [value, setValue] = useState();

    function onChange(e) {
        setValue(e.target.value);
    }

    return (
        <div
            onClick={() => props.onWgChange(props.wg)}
            key={props.wg.wrkId}
            className="wg-container"
        >
            {!editingState && (
                <p style={{ margin: 0, textAlign: "left" }}>
                    {props.wg.wrkName}
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
                        style={{ width: "140px" }}
                        type="text"
                        onChange={onChange}
                        value={value || props.tskDescription}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            setEditing(false);
                            props.saveWg({
                                ...props.wg,
                                wrkName: value || props.name,
                            });
                        }}
                    >
                        <FaSave />
                    </Button>
                </Fragment>
            )}
        </div>
    );
}
