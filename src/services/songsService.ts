import axios from 'axios';
import { User } from 'firebase/auth';
import { SongsArray } from '../schema/songSchema';

export const fetchSongs = async (user: User) => {
  if (!user) return;

  try {
    const token = await user.getIdToken();
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user.uid}/songs`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('✅ Canciones cargadas desde MongoDB');
    const result = SongsArray.safeParse(response.data);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error(`❌ Error al obtener canciones:${error}`);
  }
};
