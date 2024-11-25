import { create } from "zustand";

type State = {
  user: null | any;
};

type Action = {
  login: (user: State["user"]) => void;
  logout: () => void;
  setUser: (user: State["user"]) => void;
};

const useAuthUser = create<State & Action>((set) => ({
  user: JSON.parse(localStorage.getItem("user-info")) || null,
  login: (user: any) => set({ user: user }),
  logout: () => set({ user: null }),
  setUser: (user: any) => set({ user: user }),
}));

export default useAuthUser;
