import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { Toaster } from "react-hot-toast";
import Home from "./views/Home";
import Income from "./views/Income";
import Expense from "./views/Expense";
import Profile from "./views/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
    </>
  );
};

export default App;
