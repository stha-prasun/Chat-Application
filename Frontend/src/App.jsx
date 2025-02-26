import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setsocket } from "./redux/socketSlice";
import { setonlineUsers } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io("http://localhost:8080", {
        query: {
          userID : authUser._id
        },
      });
      dispatch(setsocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setonlineUsers(onlineUsers));
      });
      return ()=> socketio.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setsocket(null));
      }
    }
  }, [authUser]);

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
