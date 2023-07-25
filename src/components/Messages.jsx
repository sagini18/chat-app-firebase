import React, { useEffect, useState } from "react";
import { Message } from "./Message";
import { useChat } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState();
  const { data } = useChat();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
      doc.exists() && setMessages(doc?.data()?.messages);
    });
    return unSub;
  }, [data?.chatId]);
  return (
    <div className="messages">
      {messages?.map((message) => (
        <Message message={message} key={message?.id} />
      ))}
    </div>
  );
};

export default Messages;
