import React from 'react';
import ReactDOM from "react-dom/client";
import { Link, Routes, Route } from "react-router-dom";
import "../App.css";

function NavBar() {
    return (
        <div>
            <nav className = "nav">
                <a href="/test" className="title">
                    The Typing Test
                </a>
            <div>
                <li>
                    <a href="/test">Test</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
            </div>
            </nav>
        </div>
        
    )
};

export default NavBar;

