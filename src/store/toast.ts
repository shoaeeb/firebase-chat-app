import { create } from "zustand";

type State = {
  message: string;
  status: "Error" | "Success" | "";
};

type Action = {
  showToast: (message: State["message"], status: State["status"]) => void;
};

const useShowToast = create<State & Action>((set) => ({
  message: "",
  status: "",
  showToast: (message, status) =>
    set({
      message,
      status,
    }),
}));

export default useShowToast;
