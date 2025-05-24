import { useSongsStore } from '../stores/songStore';
import UserSongs from '../components/UsersSongs/UserSongs';
import Spinner from '../components/Spinner/Spinner';

export default function IndexPage() {
  const songs = useSongsStore((state) => state.songs);
  const loading = useSongsStore((state) => state.loading);
  console.log(songs);
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
