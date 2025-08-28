import useAuthStore from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  function handleLogout() {
    localStorage.clear("token");
    localStorage.clear("user");
    setUser({});
    navigate("/login");
  }

  return (
    <div>
      Dashboard
      <button className="bg-red-400" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
