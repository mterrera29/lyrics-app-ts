// 🔐 Tu client_id y client_secret de Spotify (deberías mover esto a un archivo .env en producción)
const client_id = import.meta.env.VITE_API_SP_CLIENT_ID;
const client_secret = import.meta.env.VITE_API_KEY_SP_SECRET;

// 🔁 Función para obtener el token de acceso a la API de Spotify
export const getAccessToken = async (): Promise<string> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${client_id}:${client_secret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

// 🔍 Buscar imagen del artista
export const fetchArtistImage = async (
  artistName: string,
  token: string
): Promise<string | null> => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      artistName
    )}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  const artist = data.artists?.items?.[0];
  return artist?.images?.[0]?.url || null;
};

export const fetchTrackImage = async (
  trackName: string,
  token: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        trackName
      )}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const imageUrl = data?.tracks?.items?.[0]?.album?.images?.[0]?.url;
    return imageUrl || null;
  } catch (error) {
    console.error('Error fetching track image:', error);
    return null;
  }
};

export const fetchGenreImage = async (
  genre: string,
  token: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        genre
      )}&type=playlist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    const imageUrl = data?.playlists?.items?.[0]?.images?.[0]?.url;
    return imageUrl || null;
  } catch (error) {
    console.error('Error fetching genre image:', error);
    return null;
  }
};
