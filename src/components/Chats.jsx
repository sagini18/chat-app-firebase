import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        (doc) => {
          setChats(doc?.data());
        }
      );
      return unsub;
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (payload) => {
    dispatch({ type: "CHANGE_USER", payload });
  };
  return (
    <div className="chats">
      {Object?.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => {
          return (
            <div
              className="user-chat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img
                src={chat[1]?.userInfo?.photoURL}
                alt={chat[1]?.userInfo?.displayName}
              />
              <div className="user-chat-info">
                <span className="">{chat[1]?.userInfo?.displayName}</span>
                <p>{chat[1]?.lastMessage?.text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
