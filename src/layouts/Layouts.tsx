import { useEffect } from 'react';
import Header from '../components/Header/Header';
import { useAuthStore } from '../stores/authStore';
import { useSongsStore } from '../stores/songStore';
import { Outlet } from 'react-router-dom';

export default function Layouts() {
  const user = useAuthStore((state) => state.user);
  const fetchData = useSongsStore((state) => state.fetchData);

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user, fetchData]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
