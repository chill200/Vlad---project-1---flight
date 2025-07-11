import { create } from 'zustand';

interface Game3Store {
  openEnterCodeModal: boolean;
  setEnterCodeModal: (flag: boolean) => void;
}

export const useGame3Store = create<Game3Store>((set) => ({
  openEnterCodeModal: false,
  setEnterCodeModal: (flag: boolean) => {
    set({ openEnterCodeModal: flag });
  },
}));
