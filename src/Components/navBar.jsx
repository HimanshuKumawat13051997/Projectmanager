import { useDispatch, useSelector } from "react-redux";
import { backendURL, userLogout } from "../reduxuse/extrafeature/authActions";
import axios from "axios";
import { userSet } from "../reduxuse/slices/authSlice";

export function NavBar() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = async () => {
    await axios.post(
      `${backendURL}/users/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return null;
  };

  const handleLogout = async () => {
    const d = await logout();
    dispatch(userSet(d));
  };

  return (
    <div className="col-span-2 row-span-1 flex justify-between px-2 shadow-[-1px_4px_39px_0px_rgba(0,_0,_0,_0.1)] w-full">
      <div className="flex gap-5 items-center">
        <div className="cursor-pointer flex items-center justify-center h-full p-1">
          Logo
        </div>
        <div className="cursor-pointer flex items-center justify-center h-full p-1 hover:bg-[#f0dfed]">
          Welcome {userInfo.name}
        </div>
      </div>
      <div className="flex gap-5 h-full">
        <span
          onClick={handleLogout}
          className="cursor-pointer flex items-center justify-center h-full p-1 hover:bg-[#dbdbdb]"
        >
          Logout
        </span>
      </div>
    </div>
  );
}
