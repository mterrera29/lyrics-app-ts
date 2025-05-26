import { useSongsStore } from '../stores/songStore';
import UserSongs from '../components/UsersSongs/UserSongs';
import Spinner from '../components/Spinner/Spinner';
import { useAuthStore } from '../stores/authStore';
import { useEffect } from 'react';

export default function IndexPage() {
  const songs = useSongsStore((state) => state.songs);
  const loading = useSongsStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);
  const fetchData = useSongsStore((state) => state.fetchData);

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user, fetchData]);

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
      {loading ? <Spinner /> : <UserSongs songs={songs} />}
    </div>
  );
}
