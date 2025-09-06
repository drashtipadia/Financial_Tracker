import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Input from "../components/Input";
import useAuthStore from "../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpwd, setConfirmpwd] = useState("");
  const [fullname, setFullname] = useState(user.fullname);
  const navigate = useNavigate();
  const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";

  const handleUpdatePwd = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmpwd) {
      toast.error("New Password & Confirm Password not matched");
    } else {
      const id = user._id;
      await axiosInstance
        .post(API_PATHS.AUTH.UPDATE_PWD, { id, oldpassword, newpassword })
        .then((res) => toast.success(res.data.message))
        .catch((error) => {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something  went wrong.Please try again");
          }
        });
    }
  };
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    await axiosInstance
      .put(API_PATHS.AUTH.UPDATE_USER(user._id), { fullname })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (isEmptyObject(user)) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <DashboardLayout activeMenu="Profile">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h1 className="text-center text-2xl">Profile Info</h1>
          <div>
            <Input
              label="Full name"
              type="text"
              placeholder="Jhon Deo"
              value={fullname}
              onChange={({ target }) => setFullname(target.value)}
            />
            <Input
              label="Email"
              type="text"
              placeholder=""
              value={user.email}
              disabled
            />
            <button className="add-btn" onClick={handleUpdateInfo}>
              Update
            </button>
          </div>
        </div>
        <div className="card">
          {" "}
          <h1 className="text-center text-2xl">Change Password</h1>
          <div className="pt-10">
            <form>
              <Input
                label="Old Password"
                type="password"
                placeholder="******"
                value={oldpassword}
                onChange={({ target }) => setOldPassword(target.value)}
              />
              <Input
                label="New Password"
                type="password"
                placeholder="******"
                value={newpassword}
                onChange={({ target }) => setNewPassword(target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="******"
                value={confirmpwd}
                onChange={({ target }) => setConfirmpwd(target.value)}
              />
              <button className="add-btn" onClick={handleUpdatePwd}>
                {" "}
                Update password
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
