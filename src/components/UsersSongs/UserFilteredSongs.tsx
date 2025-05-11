import styles from './UserFilteredSongs.module.css';
import { Song } from '../../types';
import imgIcon from '../../assets/jazz.png';
import { Link } from 'react-router-dom';
import SvgIcon from '../Buttons/SvgIcon';
import SortAZ from './SortAZ';
import ButtonCategory from '../Buttons/ButtonCategory';
import ButtonX from '../Buttons/ButtonX';

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <input
            type='text'
            placeholder='Buscar canción o artista...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
          />
        </div>
        <SortAZ setSort={setSortOrder} sort={sortOrder} />
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
      <ul className={styles.songList}>
        {songs.map((song) => (
          <li
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '5px',
              textDecoration: 'none',
              listStyleType: 'none',
            }}
            key={song.id}
            className={styles.song}
          >
            <Link
              to={`/song/${song.id}`}
              style={{
                textDecoration: 'none',
                marginRight: '10px',
                listStyleType: 'none',
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
                  <img src={imgIcon} alt='' className={styles.imgIcon} />
                </div>
                <section className={styles.info}>
                  <p className={styles.title}>{song.title}</p>
                  <p className={styles.artist}>{song.artist}</p>
                </section>
              </section>
            </Link>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SvgIcon
                path='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0'
                width='26'
                height='26'
                className={styles.iconEdit}
                //onClick={() => openModal(song)}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserFilteredSongs;
