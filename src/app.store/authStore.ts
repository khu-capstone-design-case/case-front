import { create } from "zustand";

type User = { id: string; name: string; accessToken: string } | null;

interface setUser {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

const initialState: { user: User } = {
  user: null,
};

export const authStore = create<typeof initialState & setUser>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  setToken: (token) =>
    set((prev) => ({
      user: {
        id: prev.user?.id ?? "",
        name: prev.user?.name || "",
        accessToken: token,
      },
    })),
}));
