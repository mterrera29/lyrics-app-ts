import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layouts from './layouts/Layouts';
import SongDetailsPage from './views/SongDetailsPage';

const IndexPage = lazy(() => import('./views/IndexPage'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layouts />}>
          <Route
            path='/'
            element={
              <Suspense>
                <IndexPage />
              </Suspense>
            }
            index
          />
          <Route
            path='/song/:id'
            element={
              <Suspense>
                <SongDetailsPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
