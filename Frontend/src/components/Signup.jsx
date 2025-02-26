import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setuser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const handleCheckbox = (gender) => {
    setuser({ ...user, gender });
  };

  return (
    <>
      <div className="min-w-96 mx-auto text-black">
        <div className="w-[30vw] p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center">Signup</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                value={user.fullname}
                onChange={(e) => setuser({ ...user, fullname: e.target.value })}
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                value={user.username}
                onChange={(e) => setuser({ ...user, username: e.target.value })}
                type="text"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                value={user.password}
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                className="w-full input input-bordered h-10"
                value={user.confirmPassword}
                onChange={(e) =>
                  setuser({ ...user, confirmPassword: e.target.value })
                }
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex items-center my-4">
              <div className="flex items-center">
                <p>Male</p>
                <input
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  className="checkbox mx-2 bg-white checked:bg-white"
                />
              </div>
              <div className="flex items-center">
                <p>Female</p>
                <input
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  className="checkbox mx-2 bg-white checked:bg-white"
                />
              </div>
            </div>
            <p className="text-center my-2">
              {" "}
              Already have an account?{" "}
              <Link className="text-white" to="/login">
                {" "}
                Login{" "}
              </Link>
            </p>
            <div>
              <button type="submit" className="btn btn-block btn-sm mt-2">
                Singup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
