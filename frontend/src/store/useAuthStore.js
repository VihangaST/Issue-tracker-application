import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,

  setToken: (token, userId) => {
    localStorage.setItem("token", token);
    set({ token, userId });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, userId: null });
  },
}));

export default useAuthStore;
