import { create } from "zustand";
import { InitUser, User } from "../types";

interface UserStore {
  users: User[] | [];
  currentUser: User | null;
  addUser: (user: InitUser) => void;
  removeUser: (id: string) => void;
  getuser: (id: string | null) => void;
}

const USERS_KEY = "users";

export const useUsersStore = create<UserStore>((set, get) => ({
  users: JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]"),
  currentUser: null,
  addUser: (user) => {
    const { users } = get();
    const newUser = {
      ...user,
      id: Math.floor(Math.random() * 100).toString(),
    };
    const newUsersList = [newUser, ...users];
    set({
      users: newUsersList,
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsersList));
  },
  removeUser: (id) => {
    const { users } = get();
    const newUsersList = users.filter((user) => user.id !== id);
    set({
      users: users.filter((user) => user.id !== id),
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsersList));
  },
  getuser: (id) => {
    const { users } = get();

    if (id == null) {
      set({
        currentUser: null,
      });
    } else {
      const existingUser = users.find((user) => user.id === id);
      if (existingUser) {
        set({
          currentUser: existingUser,
        });
      }
    }
  },
}));
