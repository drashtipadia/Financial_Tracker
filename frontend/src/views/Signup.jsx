import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { LuTrendingUpDown } from "react-icons/lu";
import { API_PATHS } from "../utils/config";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import useAuthStore from "../hooks/useAuthStore";

export default function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpwd, setConfirmpwd] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  // const user = useAuthStore((state) => state.user);
  const handleSignup = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post(API_PATHS.AUTH.REGISTER, {
        fullname,
        email,
        password,
      })
      .then((res) => {
        // console.log(JSON.stringify(res));
        if (res.status == 201) {
          localStorage.setItem("token", res.data.payload.token);
          localStorage.setItem("user", JSON.stringify(res.data.payload.data));
          setUser(res.data.payload.data);
          // console.log(user);
          navigate("/");
          toast.success("Register Successfully");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Register to Finanical Tracker
          </h2>

          <form className="space-y-5" onSubmit={handleSignup}>
            <Input
              label="Full Name"
              type="text"
              placeholder="Aliex Deo"
              value={fullname}
              onChange={({ target }) => setFullname(target.value)}
            />

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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="******"
              value={confirmpwd}
              onChange={({ target }) => setConfirmpwd(target.value)}
            />

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center bg-primary p-6">
          <div className="grid grid-cols-1 z-20">
            <StatsInfoCard
              icon={<LuTrendingUpDown />}
              label="Track Your Income & Expenses"
              value="430,000"
              color="bg-secondary"
            />
            <p className="text-white text-center p-2">
              Start tracking your expenses today.
            </p>
          </div>
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
