import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

//use a switch statement for the register page and use ? : 
//register page should have the following text fields, username, password, confirm password 


function LoginPage() {
    document.body.style.backgroundColor = "#17a2b8";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error);
        })
    };

    function LoginButton() {
        return (
          <button onClick = {handleLogin}
                  className = "login-button">
            Login
          </button>
        )
      }

    return (
        <div>
            <div className="container">
                <div className="login-text-box">
                    <input
                        type="email"
                        className="input-box"
                        placeholder="Enter username or email..."
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input-box"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
            </div>
            <LoginButton />
        </div>
    )
}

export default LoginPage;