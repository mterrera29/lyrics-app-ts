import axios from 'axios';
import { SongSchema } from '../schema/songSchema';
import { User } from 'firebase/auth';
import { Song } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const songCreate = async (
  user: User | null,
  newSong: Omit<Song, '_id' | 'id'>
) => {
  if (!user) {
    console.error('El usuario no está autenticado');
    return;
  }
  const token = await user.getIdToken();
  try {
    const songData = {
      id: uuidv4(),
      title: newSong.title,
      artist: newSong.artist,
      genre: newSong.genre,
      lyrics: newSong.lyrics,
      chords: newSong.chords,
      fontSizeChords: newSong.fontSizeChords,
      fontSizeLyrics: newSong.fontSizeLyrics,
      scrollSpeedLyrics: newSong.scrollSpeedLyrics,
      scrollSpeedChords: newSong.scrollSpeedChords,
    };

    // Enviamos la canción actualizada al backend
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs`,
      songData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = SongSchema.safeParse(response.data);
    console.log('Canción guardada exitosamente');
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error al editar la canción:', error);
  }
};
