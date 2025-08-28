import { create } from "zustand";

const useAuthStore = create((set) => ({
  // isUserValid: false,
  // setIsUserValid: (arg) => set({ isUserValid: arg }),
    user: JSON.parse(localStorage["user"] || "{}"),
  //user: localStorage["user"] || {},
  setUser: (arg) => set({ user: arg }),
}));

export default useAuthStore;
