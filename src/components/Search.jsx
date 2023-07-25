import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

export const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();
  const { dispatch } = useChat();

  const handleSearch = async () => {
    const users = collection(db, "users"); //fetch collection
    const response = query(users, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(response);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // check whether group chat exist in the firestore else create one
    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;
    try {
      const querySnap = await getDoc(doc(db, "chats", combinedId));

      if (!querySnap?.exists()) {
        // create chat in chat collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        // update chat
        await updateDoc(
          doc(db, "userChats", user?.uid),
          {
            //object's key = combinedId+userInfo
            [combinedId + ".userInfo"]: {
              uid: currentUser?.uid,
              displayName: currentUser?.displayName,
              photoURL: currentUser?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          },
          { merge: true }
        );
        await updateDoc(
          doc(db, "userChats", currentUser?.uid),
          {
            //object's key = combinedId+userInfo
            [combinedId + ".userInfo"]: {
              uid: user?.uid,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          },
          { merge: true }
        );
      }
      dispatch({ type: "CHANGE_USER", payload: user });
      setUsername("");
      setUser(null);
    } catch (err) {
      console.log("error:", err);
    }
  };
  return (
    <div className="search">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="search-form">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {user && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={user?.photoURL} alt={user?.displayName} />
          <div className="user-chat-info">
            <span className="">{user?.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
