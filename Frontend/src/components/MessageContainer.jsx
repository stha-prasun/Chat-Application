import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setselectedUser } from "../redux/userSlice.js";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setselectedUser(null)); //logout garda selected user null hunxa
    };
  }, []);

  if (!selectedUser) //Login garera first time page open huda run hunxa
    return (
      <div className="md:min-w-[550px] flex flex-col justify-center items-center text-2xl font-bold">
        <h1>Your messages</h1>
        <h1>Send a message to start a chat.</h1>
      </div>
    );

  return (
    <>
      <div className="md:min-w-[550px] flex flex-col overflow-auto">
        <div className="flex gap-2 items-center font-bold text-black px-4 py-2 mb-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={selectedUser?.profilePhoto} alt="user-profile" />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2 hover:cursor-default">
              <p>{selectedUser?.fullname}</p>
            </div>
          </div>
        </div>
        <Messages />
        <SendInput />
      </div>
    </>
  );
};

export default MessageContainer;
