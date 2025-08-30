import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import Navbar from "../components/Navbar";
import DashboardLayout from "../components/DashboardLayout";

const Home = () => {
  const navigate = useNavigate();
  //  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";
  useEffect(() => {
    if (isEmptyObject(user)) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div>
      <DashboardLayout>
        <h1>TEST</h1>
      </DashboardLayout>
    </div>
  );
};

export default Home;
