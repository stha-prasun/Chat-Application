import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const {messages} = useSelector((store)=>store.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        {message},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setmessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Send a message..."
          className="border text-sm rounded-lg block w-full p-3 border-black bg-gray-600 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4 hover:cursor-pointer"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
