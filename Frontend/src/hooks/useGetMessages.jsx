import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser) return; //Early return

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser._id}`);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

};

export default useGetMessages;
