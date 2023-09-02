import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom/client";
import { Link, Routes, Route } from "react-router-dom";
import "../App.css";
import firebase from "../firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";


function NavBar() {

    const [signedIn, setSignedIn] = useState(false);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        setSignedIn(true);
        console.log("Signed in.")
    } else {
        setSignedIn(false);
        console.log("Logged out.");
    }
    });

    const handleUserLogout = (e) => {
        auth.signOut();
        console.log("Logged out user");
    }


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
                {signedIn ? 
                    <li>
                        <a style={{cursor: 'pointer'}}
                           onClick={handleUserLogout}>Logout</a>
                    </li> :
                    <li>
                        <a href="/login">Login</a>
                    </li>
                }
            </div>
            </nav>
        </div>
        
    )
};

export default NavBar;

