import styles from './UserFilteredSongs.module.css';
import { Song } from '../../types';
import imgIcon from '../../assets/jazz.png';
import { Link } from 'react-router-dom';

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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className={styles.iconEdit}
            viewBox='0 0 16 16'
            style={{
              fontSize: '20px',
              cursor: 'pointer',
            }}
            //onClick={() => openModal(song)}
          >
            <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
            <path
              fill-rule='evenodd'
              d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
            />
          </svg>
        </li>
      ))}
    </ul>
  );
};

export default UserFilteredSongs;
