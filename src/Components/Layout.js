import React, { Fragment } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

const Layout = ({ children }) => {
    return (
        <Fragment>
            <div>
                <TopNav />
                <Sidebar />
            </div>
            <main>{children}</main>
        </Fragment>
    );
};

export default Layout;
