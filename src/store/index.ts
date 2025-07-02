import { create } from 'zustand';

interface AppState {
  scene: 1 | 2 | 3;
  setScene: (scene: 1 | 2 | 3) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scene: 1,
  setScene: (scene: 1 | 2 | 3) => {
    set({ scene });
  },
}));
