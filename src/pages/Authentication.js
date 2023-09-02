import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { auth } from "../firebase";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

//use a switch statement for the register page and use ? : 
//register page should have the following text fields, username, password, confirm password 
//when you click on the login instead/register instead button it inverts the isLogin variable
//the switch statement also switches between register and login buttons which do different actions 


function Authentication() {
    document.body.style.backgroundColor = "#17a2b8";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true); // true if we are on login page and false if we are on registeration 

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in as " + user.email);
            //console.log(user.auth().uid)
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const handleLogout = (e) => {
        auth.signOut();
        console.log("Logged out user");
    }

    const handleRegister = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });
    };


    function LoginButton() {
        return (
          <button onClick = {handleLogin}
                  className = "login-button">
            Login
          </button>
        )
      }

    function LogoutButton() {
        return (
            <button onClick = {handleLogout}
                  className = "logout-button">
            Logout
          </button>
        )
    }

    function RegisterButton() {
        return (
            <button onClick = {handleRegister}
                    className = "register-button">
            Register
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
                        placeholder="Enter a valid email..."
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input-box"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {isLogin == false ? 
                    <input
                        type="password"
                        className="input-box"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    : null}
                </div>
            </div>
            {isLogin ?
                (<div>
                <LoginButton />
                <LogoutButton />
                    <span onClick={(e) => {setIsLogin(false)
                                           setEmail("")
                                           setPassword("")}}>
                        Register Instead
                    </span>
                </div>) 
                : 
                (<div>
                    <RegisterButton />
                    <span onClick={(e) => {setIsLogin(true)
                                           setEmail("")
                                           setPassword("")
                                           setConfirmPassword("")}}>
                        Login Instead
                    </span>
                </div>)
            }
        </div>
    )
}

export default Authentication;