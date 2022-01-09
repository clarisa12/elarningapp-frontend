import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { NotFound } from "./Pages/NotFound";
import { AssignmentDetail } from "./Pages/AssignmentDetail";

import "./App.css";
import { Dashboard } from "./Pages/Dashboard";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assignment/:id" element={<AssignmentDetail />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
