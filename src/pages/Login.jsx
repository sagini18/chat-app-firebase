import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleForget = () => {
    if (email !== "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Email Sent!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Enter your email!");
    }
  };
  return (
    <div className="form-container">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="form-wrapper">
        <span className="logo">Saju Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="Password" />
          <button>Sign in</button>
        </form>
        <p className="forget-password" onClick={handleForget}>
          forget password?
        </p>
        <p>
          You don't have an account? <Link to="/register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
