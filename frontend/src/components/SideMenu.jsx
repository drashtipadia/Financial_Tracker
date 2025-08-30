import { SIDE_MENU_DATA } from "../utils/data";

import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.clear("token");
    localStorage.clear("user");
    setUser({});
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-68px)] bg-white border-r border-gray-200/50 p-4 sticky top-[61px] z-20 ">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        <h5 className="text-gray-950 font-medium leading-6">
          {user.fullname || ""}
        </h5>
      </div>
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex itmes-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 hover:bg-secondary`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" /> {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
