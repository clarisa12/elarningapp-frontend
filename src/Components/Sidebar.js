import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

export const Sidebar = (props) => {
    console.log(props.selectedWg);

    useEffect(() => {}, [props.selectedWg]);
    return (
        <div
            style={{ backgroundColor: "#111", width: "20%", minWidth: "200px" }}
        >
            <Nav defaultActiveKey="/home" className="flex-column">
                {props.workgroups.map((w) => (
                    <div
                        className={`wg-container ${
                            props.selectedWg &&
                            w.wrkID === props.selectedWg.wrkId
                                ? "selected"
                                : ""
                        }`}
                        key={w.wrkID}
                        onClick={() => props.onWgChange(w)}
                    >
                        {w.wrkName}
                    </div>
                ))}
                <div className="wg-container" onClick={props.createWg}>
                    Create Workgroup
                </div>
            </Nav>
        </div>
    );
};
