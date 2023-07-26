import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

export const Message = ({ message }) => {
  const { currentUser } = useAuth();
  const { data } = useChat();
  const ref = useRef(null);
  var curdate = new Date(null);
  curdate.setTime(message?.date?.seconds * 1000);
  var time = curdate.toTimeString().substring(0, 5);

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message?.senderId === currentUser?.uid && "owner"}`}
    >
      <div className="message-info">
        <img
          src={
            message?.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data?.user?.photoURL
          }
          alt={
            message?.senderId === currentUser?.uid
              ? currentUser?.displayName
              : data?.user?.displayName
          }
        />
        <span>{time}</span>
      </div>
      <div className="message-content">
        {message?.text && <p>{message?.text}</p>}
        {message?.image && <img src={message?.image} alt="message" />}
      </div>
    </div>
  );
};
