import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setselectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers.includes(user._id);

  async function handleSelect(user) {
    dispatch(setselectedUser(user));
  }
  return (
    <>
      <div
        onClick={() => {
          handleSelect(user);
        }}
        className="flex gap-2 items-center relative left-2 transition-transform duration-300 hover:scale-[1.05] hover:cursor-pointer"
      >
        <div className={`avatar ${isOnline? 'avatar-online' : 'avatar-offline'}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="profile" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2 ">
            <p>{user?.fullname}</p>
          </div>
        </div>
      </div>
      <div className="divider divider-neutral"></div>
    </>
  );
};

export default OtherUser;
