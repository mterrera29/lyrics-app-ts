import { useEffect } from 'react';
import Header from './components/Header/Header';
import { useAuthStore } from './stores/authStore';
import { useSongsStore } from './stores/songStore';
import UsersSongs from './components/UsersSongs/UsersSongs';

function App() {
  const user = useAuthStore((state) => state.user);
  const fetchData = useSongsStore((state) => state.fetchData);
  const songs = useSongsStore((state) => state.songs);
  const loading = useSongsStore((state) => state.loading);

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user, fetchData]);
  return (
    <>
      <Header />
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
        {loading ? <h3>Cargando</h3> : <UsersSongs songs={songs} />}
      </div>
    </>
  );
}

export default App;
