import React from "react";
import Messages from "./Messages";
import { Input } from "./Input";
import { useChat } from "../context/ChatContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase";

export const Chat = () => {
  const { data } = useChat();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          toast.success("User Deleted!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = () => {
    toast((t) => (
      <span>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            color: "red",
          }}
        >
          Are you sure?
        </p>
        <p style={{ fontSize: "14px" }}>
          Account will not be recovered in future{" "}
        </p>
        <span style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={handleDeleteUser} style={{ backgroundColor: "red" }}>
            Yes
          </button>
          <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </span>
      </span>
    ));
  };
  return (
    <div className="chat">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="chat-info">
        <span>{data?.user?.displayName}</span>
        <div className="chat-icons">
          <i
            className="uil uil-key-skeleton"
            style={{ color: "#ddddf7", fontSize: "1.3rem" }}
            onClick={() => navigate("/update-password")}
          ></i>
          <i
            className="uil uil-user-times"
            style={{ color: "#ddddf7", fontSize: "1.3rem" }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
