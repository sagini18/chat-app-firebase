import React from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useAuth();
  const { data } = useChat();
  return (
    <div className="message owner">
      <div className="message-info">
        <img
          src={
            message?.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data?.user?.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>hello</p>
        <img
          src="https://plus.unsplash.com/premium_photo-1667667720425-6972aff75f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
