import React, { useEffect, useState, Fragment } from "react";
import { Button } from "react-bootstrap";

import { FaPencilAlt } from "react-icons/fa";

export function TaskCard({
    description,
    setDescription,
    canEdit = true,
    editing = false,
}) {
    const [editing, setEditing] = useState(props.editing);
    const [value, setValue] = useState();

    function onChange(e) {
        setValue(e.target.value);
    }

    return (
        <div class="card">
            <p>{description}</p>
            {canEdit && (
                <FaPencilAlt
                    onClick={() => setEditing(true)}
                    style={{ cursor: "pointer" }}
                />
            )}

            {editing && (
                <Fragment>
                    <input
                        type="text"
                        onChange={onChange}
                        value={value || description}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            setEditing(false);
                            setDescription(value || description);
                        }}
                    >
                        Save
                    </Button>
                </Fragment>
            )}
        </div>
    );
}