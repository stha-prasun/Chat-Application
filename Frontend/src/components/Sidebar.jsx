import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setAuthUser, setotherUsers} from "../redux/userSlice.js"

const Sidebar = () => {
  const dispatch = useDispatch();
  const [search, setsearch] = useState("");
  const {otherUsers} = useSelector((store)=>store.user);

  const handleSearch = async (e)=>{
    e.preventDefault();

    const conversationUser = otherUsers?.find((user)=> user.fullname.toLowerCase().includes(search.toLowerCase()));

    if(conversationUser){
      dispatch(setotherUsers([conversationUser]));
    }

    else{
      toast.error("User not found!");
    }
    
    setsearch("");
  }

  const navigate = useNavigate();
  
  async function handleLogout() {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col font-extrabold">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="input input-bordered rounded-md"
            type="text"
            placeholder="Search..."
          />
          <button type="submit" className="btn bg-zinc-700 text-white">
            <FaSearch className="w-6 h-6 outline-none" />
          </button>
        </form>
        <div className="divider divider-neutral"></div>
        <OtherUsers />
        <div className="mt-2">
          <button onClick={handleLogout} className="btn btn-sm">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
