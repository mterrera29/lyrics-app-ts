import styles from './UserFilteredSongs.module.css';
import { Song } from '../../types';
import imgIcon from '../../assets/jazz.png';
import { Link } from 'react-router-dom';
import SvgIcon from '../Buttons/SvgIcon';

type UserFilteredSongs = {
  songs: Song[];
};

const UserFilteredSongs = ({ songs }: UserFilteredSongs) => {
  return (
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
          <SvgIcon
            path='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0'
            width='26'
            height='26'
            className={styles.iconEdit}
            //onClick={() => openModal(song)}
          />
        </li>
      ))}
    </ul>
  );
};

export default UserFilteredSongs;
