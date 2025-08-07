import axios from 'axios';
import { SongSchema } from '../schema/songSchema';
import { User } from 'firebase/auth';

export const songDeleteById = async (
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
    // Enviamos la canción actualizada al backend
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = SongSchema.safeParse(response.data);
    console.log('Canción eliminada exitosamente');
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error('Error al eliminar la canción:', error);
  }
};
