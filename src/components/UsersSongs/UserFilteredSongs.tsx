import { useEffect, useState } from 'react';
import styles from './UserFilteredSongs.module.css';
import { Song } from '../../types';
import imgIcon from '../../assets/jazz.png';
import { Link } from 'react-router-dom';
import SvgIcon from '../Buttons/SvgIcon';
import SortAZ from './SortAZ';
import ButtonCategory from '../Buttons/ButtonCategory';
import ButtonX from '../Buttons/ButtonX';
import {
  getAccessToken,
  fetchArtistImage,
  fetchTrackImage,
} from '../../services/spotifyService';

type UserFilteredSongs = {
  songs: Song[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  selectedAuthor: string;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<string>>;
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
};

const UserFilteredSongs = ({
  songs,
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  selectedAuthor,
  setSelectedAuthor,
  selectedGenre,
  setSelectedGenre,
}: UserFilteredSongs) => {
  const [currentPage, setCurrentPage] = useState(2);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(songs.length / itemsPerPage);
  const currentSongs = songs.slice(startIndex, startIndex + itemsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  console.log(pages);

  const [artistImages, setArtistImages] = useState<{
    [artist: string]: string;
  }>(() => {
    const cache = localStorage.getItem('artistImages');
    return cache ? JSON.parse(cache) : {};
  });

  const [trackImages, setTrackImages] = useState<{ [title: string]: string }>(
    () => {
      const cache = localStorage.getItem('trackImages');
      return cache ? JSON.parse(cache) : {};
    }
  );

  useEffect(() => {
    const loadImages = async () => {
      const token = await getAccessToken();
      const cachedArtistImages = JSON.parse(
        localStorage.getItem('artistImages') || '{}'
      );
      const cachedTrackImages = JSON.parse(
        localStorage.getItem('trackImages') || '{}'
      );

      const newArtistImages = { ...cachedArtistImages };
      const newTrackImages = { ...cachedTrackImages };

      let updatedArtist = false;
      let updatedTrack = false;

      for (const song of songs) {
        if (!newArtistImages[song.artist]) {
          const artistImg = await fetchArtistImage(song.artist, token);
          if (artistImg) {
            newArtistImages[song.artist] = artistImg;
            updatedArtist = true;
          }
        }

        if (!newTrackImages[song.title]) {
          const trackImg = await fetchTrackImage(song.title, token);
          if (trackImg) {
            newTrackImages[song.title] = trackImg;
            updatedTrack = true;
          }
        }
      }

      if (updatedArtist) {
        localStorage.setItem('artistImages', JSON.stringify(newArtistImages));
        setArtistImages(newArtistImages);
      }

      if (updatedTrack) {
        localStorage.setItem('trackImages', JSON.stringify(newTrackImages));
        setTrackImages(newTrackImages);
      }
    };

    if (songs.length > 0) loadImages();
  }, [songs]);

  /*  const clearCache = () => {
    localStorage.removeItem('artistImages');
    localStorage.removeItem('trackImages');
    setArtistImages({});
    setTrackImages({});
  }; */

  return (
    <section className={styles.containerSongs}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type='text'
            placeholder='Buscar canción o artista...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
          />
        </div>
        <SortAZ setSort={setSortOrder} sort={sortOrder} />
        {/* <button onClick={clearCache} style={{ marginLeft: '10px' }}>
          Limpiar caché
        </button> */}
      </div>

      {selectedAuthor && (
        <div
          style={{
            alignSelf: 'self-start',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
          }}
          onClick={() => setSelectedAuthor('')}
        >
          <ButtonX selected={false}>
            <i className='bi bi-x'></i>
          </ButtonX>
          <ButtonCategory selected={true}>{selectedAuthor}</ButtonCategory>
        </div>
      )}

      {selectedGenre && (
        <div
          style={{
            alignSelf: 'self-start',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
          }}
          onClick={() => setSelectedGenre('')}
        >
          <ButtonX selected={false}>
            <i className='bi bi-x'></i>
          </ButtonX>
          <ButtonCategory selected={true}>{selectedGenre}</ButtonCategory>
        </div>
      )}
      <ul style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
        {pages.map((page) => (
          <p
            style={{ marginLeft: '10px', cursor: 'pointer' }}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </p>
        ))}
      </ul>

      <ul className={styles.songList}>
        {currentSongs.map((song) => (
          <li
            key={song.id}
            className={styles.song}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px',
              listStyleType: 'none',
            }}
          >
            <Link
              to={`/song/${song.id}`}
              style={{
                textDecoration: 'none',
                marginRight: '10px',
                width: '100%',
              }}
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
                    src={
                      trackImages[song.title] ||
                      artistImages[song.artist] ||
                      imgIcon
                    }
                    alt={song.title}
                    className={styles.imgIcon}
                  />
                </div>
                <section className={styles.info}>
                  <p className={styles.title}>{song.title}</p>
                  <p className={styles.artist}>{song.artist}</p>
                </section>
              </section>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SvgIcon
                path='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0'
                width='26'
                height='26'
                className={styles.iconEdit}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserFilteredSongs;
