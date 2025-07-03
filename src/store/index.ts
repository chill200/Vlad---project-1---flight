import { create } from 'zustand';

interface AppState {
  activeScene: 1 | 2 | 3;
  setScene: (scene: 1 | 2 | 3) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeScene: 1,
  setScene: (scene: 1 | 2 | 3) => {
    set({ activeScene: scene });
  },
}));
