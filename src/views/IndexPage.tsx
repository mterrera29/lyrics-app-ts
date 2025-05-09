import { useSongsStore } from '../stores/songStore';
import UserSongs from '../components/UsersSongs/UserSongs';

export default function IndexPage() {
  const songs = useSongsStore((state) => state.songs);
  const loading = useSongsStore((state) => state.loading);
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
      {loading ? <h3>Cargando</h3> : <UserSongs songs={songs} />}
    </div>
  );
}
