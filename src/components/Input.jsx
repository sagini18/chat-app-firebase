import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import {
  arrayUnion,
  updateDoc,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";

export const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useAuth();
  const { data } = useChat();

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      uploadBytesResumable(storageRef, image).then(async (error) => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data?.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser?.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data?.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser?.uid), {
      [data?.chatId + ".lastMessage"]: {
        text,
      },
      [data?.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data?.user?.uid), {
      [data?.chatId + ".lastMessage"]: {
        text,
      },
      [data?.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImage(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <input
          type="file"
          id="attachment"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="attachment">
          <i className="uil uil-paperclip"></i>
        </label>
        {/* <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <i className="uil uil-image-plus"></i>
        </label> */}
        <button
          onClick={handleSend}
          onKeyDown={(e) => {
            e.code === "Enter" && handleSend();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
