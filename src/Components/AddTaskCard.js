import React from "react";

export function AddTaskCard({ onClick }) {
    return (
        <div className="card" style={{ cursor: "pointer" }} onClick={onClick}>
            <h6>+ Add Task</h6>
        </div>
    );
}
