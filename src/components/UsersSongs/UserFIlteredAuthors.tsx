import { useEffect, useState } from 'react';
import styles from './UserFilteredSongs.module.css';
import imgIcon from '../../assets/jazz.png';
import SvgIcon from '../Buttons/SvgIcon';
import SortAZ from './SortAZ';
import {
  getAccessToken,
  fetchArtistImage,
} from '../../services/spotifyService';

type UserFilteredAuthorsProps = {
  artist: string[];
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortArtist: string;
  setSortArtist: React.Dispatch<React.SetStateAction<string>>;
};

const UserFilteredAuthors = ({
  artist,
  setSelectedAuthor,
  searchQuery,
  setSearchQuery,
  sortArtist,
  setSortArtist,
}: UserFilteredAuthorsProps) => {
  const [artistImages, setArtistImages] = useState<{
    [artist: string]: string;
  }>(() => {
    const cache = localStorage.getItem('artistImages');
    return cache ? JSON.parse(cache) : {};
  });

  useEffect(() => {
    const loadImages = async () => {
      const token = await getAccessToken();
      const cache = localStorage.getItem('artistImages');
      const cachedImages = cache ? JSON.parse(cache) : {};
      const uniqueArtists = [...new Set(artist)];
      const newImages: { [artist: string]: string } = { ...cachedImages };
      let updated = false;

      for (const artistName of uniqueArtists) {
        if (!cachedImages[artistName]) {
          const image = await fetchArtistImage(artistName, token);
          if (image) {
            newImages[artistName] = image;
            updated = true;
          }
        }
      }

      if (updated) {
        localStorage.setItem('artistImages', JSON.stringify(newImages));
      }

      setArtistImages(newImages);
    };

    if (artist.length > 0) loadImages();
  }, [artist]);

  const handleClick = (author: string) => {
    setSelectedAuthor(author);
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
              placeholder='Buscar artista...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        <SortAZ setSort={setSortArtist} sort={sortArtist} />
      </div>

      <ul className={styles.songList}>
        {artist.map((author, index) => (
          <li
            key={index}
            className={styles.song}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px',
              listStyleType: 'none',
            }}
            onClick={() => handleClick(author)}
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
                  src={artistImages[author] || imgIcon}
                  alt={author}
                  className={styles.imgIcon}
                />
              </div>
              <section className={styles.info}>
                <p className={styles.title}>{author}</p>
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

export default UserFilteredAuthors;
