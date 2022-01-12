import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TopNav } from "../Components/TopNav";
import { Fragment } from "react";
export const Login = () => {
    return (
        <Fragment>
            <TopNav />

            <div style={{ maxWidth: "400px", margin: "100px auto" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Link to="/dashboard">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Link>
                </Form>
            </div>
        </Fragment>
    );
};
