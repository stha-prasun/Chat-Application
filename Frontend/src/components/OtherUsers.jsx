import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  //Custom Hook
  useGetOtherUsers();

  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) {
    return; //Early return in React => Kehi value null aauda sedhai retrun garidene
  }

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden flex-1">
        {otherUsers?.map((user) => {
          return <OtherUser key={user._id} user={user} />;
        })}
      </div>
    </>
  );
};

export default OtherUsers;
