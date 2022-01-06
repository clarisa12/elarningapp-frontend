import { useState } from "react";
import { Nav } from "react-bootstrap";

export const Sidebar = (props) => {
    // const [selected, setSelected] = useState();

    return (
        <div style={{ backgroundColor: "#111", width: "100px" }}>
            <Nav defaultActiveKey="/home" className="flex-column">
                {props.workgroups.map((name) => (
                    <Nav.Link href="/home">{name}</Nav.Link>
                ))}
            </Nav>
        </div>
    );
};
