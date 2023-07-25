import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { currentUser } = useAuth();
  return (
    <div className="navbar">
      <span className="logo">Saju Chat</span>
      <div className="user">
        <img src={currentUser?.photoURL} alt={currentUser?.displayName} />
        <span>{currentUser?.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};
