import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchSongs } from '../services/songsService';
import { Song } from '../types';
import { User } from 'firebase/auth';
import { fetchSongById } from '../services/songIdService';

type SongsStore = {
  songs: Song[];
  songById: Song;
  loading: boolean;
  fetchData: (user: User) => Promise<void>;
  fetchDataById: (user: User | null, id: string | undefined) => Promise<void>;
};

export const useSongsStore = create<SongsStore>()(
  devtools((set) => ({
    songs: [],
    songById: {},
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
    fetchDataById: async (user, id) => {
      set(() => ({
        loading: true,
      }));
      if (!user) return;
      const result = await fetchSongById(user, id);
      set(() => ({
        songById: result,
        loading: false,
      }));
    },
  }))
);
