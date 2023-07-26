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
  var prevDate = "Tue Jul 25 1777";

  return (
    <div className="messages">
      {messages?.map((message) => {
        var curdate = new Date(null);
        curdate.setTime(message?.date?.seconds * 1000);
        var date = curdate.toDateString();
        var show = false;
        console.log("prevDate: ", prevDate);
        console.log("date: ", date);
        if (prevDate !== date) {
          show = true;
          prevDate = date;
        }
        return (
          <>
            {show && <div className="date">{date}</div>}
            <Message message={message} key={message?.id} />
          </>
        );
      })}
    </div>
  );
};

export default Messages;
