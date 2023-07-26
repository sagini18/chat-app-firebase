import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
// import { ref, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase";

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

  // const handleDownload = async (message) => {
  //   try {
  //     const fileURL = message?.image;
  //     const fileName =
  //       message?.senderId === currentUser?.uid
  //         ? currentUser?.displayName
  //         : data?.user?.displayName;
  //     // const blob = ref(storage, fileURL);

  //     console.log("fileURL:", fileURL);
  //     getDownloadURL(ref(storage, fileURL))
  //       .then((url) => {
  //         // `url` is the download URL for 'images/stars.jpg'

  //         // This can be downloaded directly:
  //         const xhr = new XMLHttpRequest();
  //         xhr.responseType = "blob";
  //         xhr.onload = (event) => {
  //           const blob = xhr.response;
  //         };
  //         xhr.open("GET", url);
  //         xhr.send();

  //         // Or inserted into an <img> element
  //         const img = document.getElementById("myimg");
  //         img.setAttribute("src", url);
  //       })
  //       .catch((error) => {
  //         // Handle any errors
  //       });

  //     // const blob = await fileURL.blob(); //to convert the response into a Blob object.
  //     // const url = URL.createObjectURL(blob);
  //     // const a = document.createElement("a");
  //     // a.href = url;
  //     // a.download = fileName;
  //     // document.body.appendChild(a);
  //     // a.click();
  //     // a.remove();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        {/* {message?.image && (
          <i
            className="uil uil-cloud-download"
            onClick={() => handleDownload(message)}
          ></i>
        )} */}
      </div>
    </div>
  );
};
