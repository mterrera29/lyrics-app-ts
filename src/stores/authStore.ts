import { create } from 'zustand';
import { auth, provider } from '../config/firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => {
    onAuthStateChanged(auth, (user) => {
      set({ user });
    });

    return {
      user: null,
      login: async () => {
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
      },
      logout: async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      },
    };
  })
);
