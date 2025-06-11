import { useEffect, useState } from 'react';
import styles from './UserFilteredSongs.module.css';
import imgIcon from '../../assets/jazz.png';
import SvgIcon from '../Buttons/SvgIcon';
import SortAZ from './SortAZ';
import { getAccessToken, fetchGenreImage } from '../../services/spotifyService';

type UserFilteredGenresProps = {
  genres: string[];
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortGenre: string;
  setSortGenre: React.Dispatch<React.SetStateAction<string>>;
};

const UserFilteredGenres = ({
  genres,
  setSelectedGenre,
  searchQuery,
  setSearchQuery,
  sortGenre,
  setSortGenre,
}: UserFilteredGenresProps) => {
  const [genreImages, setGenreImages] = useState<{ [genre: string]: string }>(
    () => {
      const cache = localStorage.getItem('genreImages');
      return cache ? JSON.parse(cache) : {};
    }
  );

  useEffect(() => {
    const loadGenreImages = async () => {
      const token = await getAccessToken();
      const cachedImages = JSON.parse(
        localStorage.getItem('genreImages') || '{}'
      );
      const newGenreImages = { ...cachedImages };
      let updated = false;

      for (const genre of genres) {
        if (!newGenreImages[genre]) {
          const img = await fetchGenreImage(genre, token);
          if (img) {
            newGenreImages[genre] = img;
            updated = true;
          }
        }
      }

      if (updated) {
        localStorage.setItem('genreImages', JSON.stringify(newGenreImages));
        setGenreImages(newGenreImages);
      }
    };

    if (genres.length > 0) loadGenreImages();
  }, [genres]);

  const handleClick = (genre: string) => {
    setSelectedGenre(genre);
  };

  return (
    <section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div className={styles.searchQuery}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type='text'
              placeholder='Buscar género...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <SortAZ setSort={setSortGenre} sort={sortGenre} />
      </div>
      <ul className={styles.songList}>
        {genres.map((genre, index) => (
          <li
            key={index}
            className={styles.song}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px',
              listStyleType: 'none',
              cursor: 'pointer',
            }}
            onClick={() => handleClick(genre)}
          >
            <section
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <div className={styles.playImgIcon}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className={styles.play}
                  viewBox='0 0 16 16'
                >
                  <path d='m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393' />
                </svg>
                <div className={styles.backImg}></div>
                <img
                  src={genreImages[genre] || imgIcon}
                  alt={genre}
                  className={styles.imgIcon}
                />
              </div>
              <section className={styles.info}>
                <p className={styles.title}>{genre}</p>
              </section>
            </section>
            <SvgIcon
              path='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0'
              width='26'
              height='26'
              className={styles.iconEdit}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserFilteredGenres;
