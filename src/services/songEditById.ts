import axios from 'axios';
import { SongSchema } from '../schema/songSchema';
import { User } from 'firebase/auth';
import { Song } from '../types';

export const songEditById = async (
  user: User | null,
  id: string | undefined,
  editedSong: Song
) => {
  if (!user) {
    console.error('El usuario no está autenticado');
    return;
  }
  if (!id) return;
  const token = await user.getIdToken();
  try {
    const updatedSong = { ...editedSong };

    // Enviamos la canción actualizada al backend
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs/${id}`,
      updatedSong,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = SongSchema.safeParse(response.data);
    console.log('Cambios guardados exitosamente');
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error al editar la canción:', error);
  }
};
