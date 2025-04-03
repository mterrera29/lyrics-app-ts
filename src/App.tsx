import { useEffect } from 'react';
import Header from './components/Header/Header';
import { useAuthStore } from './stores/authStore';
import { useSongsStore } from './stores/songStore';

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
      <div>
        {loading ? (
          <h3>Cargando</h3>
        ) : (
          songs.map((song) => <h4>{song.title} </h4>)
        )}
      </div>
    </>
  );
}

export default App;
