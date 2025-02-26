import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setuser({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className="min-w-96 mx-auto text-black">
        <div className="w-[30vw] p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="text"
                value={user.username}
                onChange={(e) => setuser({ ...user, username: e.target.value })}
                placeholder="Username"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                type="password"
                value={user.password}
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                placeholder="Password"
              />
            </div>
            <p className="text-center my-2">
              {" "}
              Don't have an account?{" "}
              <Link className="text-white" to="/register">
                {" "}
                Signup{" "}
              </Link>
            </p>
            <div>
              <button type="submit" className="btn btn-block btn-sm mt-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
