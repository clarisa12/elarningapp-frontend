import { Fragment, useEffect, useCallback, useReducer, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { TopNav } from "../Components/TopNav";
import { api } from "../api";
import { AddTaskCard } from "../Components/AddTaskCard";
import { DraggableTaskCard } from "../Components/DraggableTaskCard";
import { produce, current } from "immer";
import "./AssignmentDetail.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const proposed = "PROPOSED";
const inExecution = "IN_EXECUTION";
const completed = "COMPLETED";

export const AssignmentDetail = () => {
    const [dragging, setDragging] = useState(false);
    const [assig, setAssig] = useState({});
    const dragReducer = produce((draft, action) => {
        switch (action.type) {
            case "LOAD":
                {
                    const a = action.data.filter(
                        (a) => a.tskState === proposed
                    );
                    const b = action.data.filter(
                        (a) => a.tskState === inExecution
                    );
                    const c = action.data.filter(
                        (a) => a.tskState === completed
                    );

                    draft.items[proposed] = a;
                    draft.items[inExecution] = b;
                    draft.items[completed] = c;
                }
                break;
            case "MOVE":
                {
                    draft.items[action.from] = draft.items[action.from] || [];
                    draft.items[action.to] = draft.items[action.to] || [];
                    const [removed] = draft.items[action.from].splice(
                        action.fromIndex,
                        1
                    );
                    draft.items[action.to].splice(action.toIndex, 0, removed);

                    updateTaskState();
                }
                break;
            case "START_TASK":
                const d = current(draft.items[action.state]);
                draft.items[action.state] = [
                    ...d,
                    {
                        tskState: action.state,
                        editing: true,
                        tskDescription: "",
                        tskStartDate: "2022-03-01",
                        tskEndDate: "2022-04-01",
                        tskStudResponsible: null,
                        tskAssig: null,
                        _id: id(),
                    },
                ];

                break;

            case "UPDATE_DESCRIPTION":
                {
                    const d = current(draft.items[action.state]);

                    const t1 = d.filter((t) => t._id !== action.id);
                    const item = d.find((t) => t._id === action.id);

                    const a = {
                        ...item,
                        tskDescription: action.tskDescription,
                        editing: false,
                    };

                    draft.items[action.state] = [...t1, a];

                    createTask(a);
                }
                break;

            default:
                return state;
        }
    });

    const [state, dispatch] = useReducer(dragReducer, {
        items: {
            [proposed]: [],
            [inExecution]: [],
            [completed]: [],
        },
    });

    const onDragEnd = useCallback((result) => {
        setDragging(false);
        if (result.reason === "DROP") {
            if (!result.destination) {
                return;
            }
            dispatch({
                type: "MOVE",
                from: result.source.droppableId,
                to: result.destination.droppableId,
                fromIndex: result.source.index,
                toIndex: result.destination.index,
            });
        }
    }, []);

    useEffect(() => {
        const assigId = window.location.pathname.split("/").pop();

        api.get(`/assignments/${assigId}`).then((assig) => {
            setAssig(assig);
            dispatch({ type: "LOAD", data: assig.assigTask });
        });
    }, []);

    function updateTaskState(newTask) {
        // api.put(`/task/${newTask.tskId}`, newTask).then(() => {
        //     console.log("success");
        // });
    }

    function createTask(newTask) {
        const assigId = window.location.pathname.split("/").pop();

        api.put(`/assignments/${assigId}`, {
            ...assig,
            assigTask: [...assig.assigTask, newTask],
        }).then(() => {
            console.log("success");
        });
    }

    function startTask(state) {
        dispatch({ type: "START_TASK", state });
    }

    function setDescription(state, id) {
        return (description) => {
            dispatch({
                type: "UPDATE_DESCRIPTION",
                state,
                id,
                tskDescription: description,
            });
        };
    }

    function id() {
        return String(Date.now());
    }

    return (
        <Fragment>
            <TopNav />
            <Container style={{ marginTop: "24px" }}>
                <h2 style={{ margin: "40px auto" }}>{assig.assigName}</h2>
                <Row md={3} className="g-4" style={{ height: "100vh" }}>
                    <DragDropContext
                        onDragStart={() => setDragging(true)}
                        onDragEnd={onDragEnd}
                    >
                        {[proposed, inExecution, completed].map((s) => {
                            return (
                                <Col
                                    key={s}
                                    style={{ borderRight: "2px dotted #eee" }}
                                >
                                    <h3>{s}</h3>

                                    <AddTaskCard onClick={() => startTask(s)} />
                                    <Droppable droppableId={s}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    style={{ height: "100%" }}
                                                    className={`drop ${
                                                        dragging
                                                            ? "dragging"
                                                            : ""
                                                    }`}
                                                    ref={provided.innerRef}
                                                >
                                                    {state.items[s].map(
                                                        (t, index) => (
                                                            <Draggable
                                                                draggableId={
                                                                    t._id ||
                                                                    String(
                                                                        t.tskId
                                                                    )
                                                                }
                                                                key={
                                                                    t._id ||
                                                                    String(
                                                                        t.tskId
                                                                    )
                                                                }
                                                                index={index}
                                                            >
                                                                {(provided) => (
                                                                    <DraggableTaskCard
                                                                        innerRef={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        setDescription={setDescription(
                                                                            s,
                                                                            t._id
                                                                        )}
                                                                        task={t}
                                                                        index={
                                                                            index
                                                                        }
                                                                    />
                                                                )}
                                                            </Draggable>
                                                        )
                                                    )}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </Col>
                            );
                        })}
                    </DragDropContext>
                </Row>
            </Container>
        </Fragment>
    );
};
