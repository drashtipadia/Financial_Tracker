import React, { useEffect, useState } from "react";
import Input from "../components/input";
import useAuthStore from "../hooks/useAuthStore.js";
import { Link, useNavigate } from "react-router-dom";
import { LuTrendingUpDown } from "react-icons/lu";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";
  useEffect(() => {
    return isEmptyObject(user) ? navigate("/login") : navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    await axiosInstance
      .post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        localStorage.setItem("token", res.data.payload.token);
        localStorage.setItem("user", JSON.stringify(res.data.payload.user));
        setUser(res.data.payload.user);
        // console.log(user);
        navigate("/");
        toast.success("Login Successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center bg-primary p-6">
          <div className="grid grid-cols-1 z-20">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Track Your Income & Expenses"
              value="430,000"
              color="bg-secondary"
            />
            <p className="text-white text-center p-2">
              Financial Tracker helps you take control of your finances by
              logging and organizing daily expenses.
            </p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Login to Finanical Tracker
          </h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="******"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">₹ {value}</span>
      </div>
    </div>
  );
};
