import { create } from "zustand";
import type { User } from "@/types/user";

type UserState = {
  user: User | null;
  userId: string | null;
  setUser: (user: User | null) => void;
  setUserId: (userId: string | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  userId: null,
  setUser: (user) =>
    set({
      user,
      userId: user?.userId ?? null,
    }),
  setUserId: (userId) => set({ userId }),
  clearUser: () => set({ user: null, userId: null }),
}));
