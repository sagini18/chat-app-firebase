import React from "react";
import { Sidebar } from "./../components/Sidebar";
import { Chat } from "./../components/Chat";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  return currentUser?.emailVerified ? (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  ) : (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Please Verify Your Email</h2>
      </div>
    </div>
  );
};

export default Home;
