import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";
import { Workgroup } from "../Components/Workgroup";

export const Sidebar = (props) => {
    return (
        <div
            style={{ backgroundColor: "#111", width: "20%", minWidth: "200px" }}
        >
            <Nav defaultActiveKey="/home" className="flex-column">
                {props.workgroups.map((w) => (
                    <Workgroup
                        wg={w}
                        saveWg={props.saveWg}
                        onWgChange={props.onWgChange}
                        {...props}
                    >
                        {w.wrkName}
                    </Workgroup>
                ))}
                <div className="wg-container" onClick={props.createWg}>
                    Create Workgroup
                </div>
            </Nav>
        </div>
    );
};
