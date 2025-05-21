import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchSongs } from '../services/songsService';
import { Song } from '../types';
import { User } from 'firebase/auth';
import { fetchSongById } from '../services/songIdService';
import { songEditById } from '../services/songEditById';
import { songCreate } from '../services/songCreateService';

type SongsStore = {
  songs: Song[];
  songById: Song;
  loading: boolean;
  fetchData: (user: User) => Promise<void>;
  fetchDataById: (user: User | null, id: string | undefined) => Promise<void>;
  songEdit: (
    user: User | null,
    id: string | undefined,
    editedSong: Song
  ) => Promise<void>;
  createNewSong: (
    user: User | null,
    newSong: Omit<Song, '_id' | 'id'>
  ) => Promise<void>;
};

const initialSong: Song = {
  _id: '',
  id: '',
  artist: '',
  lyrics: '',
  genre: '',
  chords: '',
  scrollSpeedLyrics: 0,
  scrollSpeedChords: 0,
  fontSizeChords: 0,
  fontSizeLyrics: 0,
  title: '',
};

export const useSongsStore = create<SongsStore>()(
  devtools((set) => ({
    songs: [],
    songById: initialSong,
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
    songEdit: async (user, id, editedSong) => {
      set(() => ({
        loading: true,
      }));
      if (!user) return;
      const result = await songEditById(user, id, editedSong);
      set(() => ({
        songById: result,
        loading: false,
      }));
    },
    createNewSong: async (user, newSong) => {
      set(() => ({
        loading: true,
      }));
      if (!user) return;
      const result = await songCreate(user, newSong);
      set(() => ({
        songById: result,
        loading: false,
      }));
    },
  }))
);
