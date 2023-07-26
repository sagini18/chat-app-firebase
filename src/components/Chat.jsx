import React from "react";
import Messages from "./Messages";
import { Input } from "./Input";
import { useChat } from "../context/ChatContext";

export const Chat = () => {
  const { data } = useChat();
  return (
    <div className="chat">
      <div className="chat-info">
        <span>{data?.user?.displayName}</span>
        {/* <div className="chat-icons">
          <i
            className="uil uil-video"
            style={{ color: "#ddddf7", fontSize: "1.3rem" }}
          ></i>
          <i
            className="uil uil-user-plus"
            style={{ color: "#ddddf7", fontSize: "1.3rem" }}
          ></i>
          <i
            className="uil uil-ellipsis-h"
            style={{ color: "#ddddf7", fontSize: "1.3rem" }}
          ></i>
        </div> */}
      </div>
      <Messages />
      <Input />
    </div>
  );
};
