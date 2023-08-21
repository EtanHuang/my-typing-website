import React from 'react';
import ReactDOM from "react-dom/client";
import { Link, Routes, Route } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <li>
                <Link to="/">Test</Link>
            </li>
        </div>
    )
};

export default NavBar;

