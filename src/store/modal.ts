import { create } from "zustand";

type State = {
  state: boolean;
};

type Action = {
  open: (option: boolean) => void;
};

const useModal = create<State & Action>((set) => ({
  state: false,
  open: (option: boolean) => {
    set({
      state: option,
    });
  },
}));

export default useModal;
