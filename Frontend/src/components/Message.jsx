import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const {authUser, selectedUser} = useSelector((store)=>store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);  

  return (
    <>
      <div ref={scroll} className={`chat mb-5 ${authUser?._id === message?.senderID ? 'chat-end':'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message.senderID === authUser?._id ? authUser?.profilePhoto : selectedUser.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
        </div>
        <div className="chat-bubble">{message?.message}</div>
      </div>
    </>
  );
};

export default Message;
