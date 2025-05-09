import axios from 'axios';
import { SongSchema } from '../schema/songSchema';
import { User } from 'firebase/auth';

export const fetchSongById = async (
  user: User | null,
  id: string | undefined
) => {
  if (!user) {
    console.error('El usuario no está autenticado');
    return;
  }
  if (!id) return;
  const token = await user.getIdToken();
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = SongSchema.safeParse(response.data);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error al obtener la canción:', error);
  }
};
