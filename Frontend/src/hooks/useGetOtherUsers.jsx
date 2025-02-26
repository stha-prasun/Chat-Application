import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setotherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8080/api/v1/user/`);
        dispacth(setotherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
