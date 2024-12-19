import { create } from 'zustand';

interface NullifierState {
  nullifier: string | null;
  setNullifier: (nullifier: string | null) => void;
  clearNullifier: () => void;
}

export const useNullifierStore = create<NullifierState>((set) => ({
  nullifier: null,
  setNullifier: (nullifier) => set({ nullifier }),
  clearNullifier: () => set({ nullifier: null }),
}));

// https://winggroup.org
// https://winggroup.org
// https://winggroup.org
