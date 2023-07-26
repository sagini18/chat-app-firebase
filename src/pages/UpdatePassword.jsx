import React from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    const newPassword = e.target[0].value;
    const confirmPassword = e.target[1].value;
    if (newPassword === confirmPassword) {
      const user = auth.currentUser;
      updatePassword(user, newPassword)
        .then(() => {
          toast.success("Password Updated!");
          navigate("/home");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Passwords do not match!");
    }
  };
  return (
    <div className="form-container">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="form-wrapper">
        <h4>Update Password</h4>
        <form onSubmit={handleUpdate}>
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm Password" />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};
