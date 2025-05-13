import { useParams } from 'react-router-dom';
import { useSongsStore } from '../stores/songStore.js';
import SongDetails from '../components/DetailsSong/SongDetails.tsx';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore.ts';

function SongDetailsPage() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const songs = useSongsStore((state) => state.songs);
  const fetchDataById = useSongsStore((state) => state.fetchDataById);
  const filterSong = songs.filter((song) => song.id === id);
  const song = filterSong[0];

  useEffect(() => {
    if (user) {
      fetchDataById(user, id);
    }
  }, [user, fetchDataById, id]);

  if (!song) {
    return (
      <div className='spinner'>
        <div className='spinner-inner'></div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <SongDetails song={song} id={id} />
    </div>
  );
}

export default SongDetailsPage;
