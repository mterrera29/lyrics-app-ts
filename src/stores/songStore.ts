import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchSongs } from '../services/songsService';
import { Song } from '../types';
import { User } from 'firebase/auth';

type SongsStore = {
  songs: Song[];
  loading: boolean;
  fetchData: (user: User) => Promise<void>;
};

export const useSongsStore = create<SongsStore>()(
  devtools((set) => ({
    songs: [],
    loading: true,
    fetchData: async (user) => {
      set(() => ({
        loading: true,
      }));
      if (!user) return;
      const result = await fetchSongs(user);
      set(() => ({
        songs: result || [],
        loading: false,
      }));
    },
  }))
);
