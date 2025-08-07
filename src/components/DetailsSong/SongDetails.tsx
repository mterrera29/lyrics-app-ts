import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SongContent from './SongContent';
import { Song } from '../../types';
import styles from './SongDetails.module.css';
import ScrollBar from '../ScrollBar/ScrollBar';
import { useSongsStore } from '../../stores/songStore';
import { useAuthStore } from '../../stores/authStore';
import imgIcon from '../../assets/jazz.png';
import { useWakeLock } from '../../hooks/useWakeLock';
import Modal from '../Modal/Modal';
import NewSongForm from '../Forms/NewSongForm';

type SongContentProps = {
  song: Song;
  id: string | undefined;
};

export default function SongDetails({ song, id }: SongContentProps) {
  const [fontSizeLyrics, setFontSizeLyrics] = useState(16);
  const [fontSizeChords, setFontSizeChords] = useState(16);
  const [activeTab, setActiveTab] = useState('lyrics');
  const songEdit = useSongsStore((state) => state.songEdit);
  const fetchDataById = useSongsStore((state) => state.fetchDataById);
  const user = useAuthStore((state) => state.user);
  const [editedSong, setEditedSong] = useState(song);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const navigate = useNavigate();

  useWakeLock();

  const [artistImages] = useState<{
    [artist: string]: string;
  }>(() => {
    const cache = localStorage.getItem('artistImages');
    return cache ? JSON.parse(cache) : {};
  });

  const [trackImages] = useState<{ [title: string]: string }>(() => {
    const cache = localStorage.getItem('trackImages');
    return cache ? JSON.parse(cache) : {};
  });

  const handleChange = (e: { target: { name: string; value: number } }) => {
    const { name, value } = e.target;
    setEditedSong((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (user) {
      songEdit(user, id, editedSong);
    }
  };

  useEffect(() => {
    if (song) {
      if (song.fontSizeLyrics) {
        setFontSizeLyrics(song.fontSizeLyrics);
      }
      if (song.fontSizeChords) {
        setFontSizeChords(song.fontSizeChords);
      }
    }
  }, [song]);

  return (
    <div className={styles.container}>
      <div
        style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}
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
              trackImages[song.title] || artistImages[song.artist] || imgIcon
            }
            alt={song.title}
            className={styles.imgIcon}
          />
        </div>
        <div style={{ marginLeft: '10px', width: '100%' }}>
          <h2 style={{ margin: '0', marginRight: '60px' }}>{song.title}</h2>
          <h3 style={{ margin: '0', marginRight: '60px' }}>{song.artist}</h3>
        </div>
        <button
          onClick={() => setIsModalDeleteOpen(true)}
          style={{
            padding: '5px 8px',
            marginLeft: '10px',
            backgroundColor: 'var(--purple)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '50px',
            justifySelf: 'flex-end',
            alignSelf: 'flex-start',
          }}
        >
          <i
            className='bi bi-trash'
            style={{
              color: 'white',
              width: '25px',
              height: '25px',
              fontSize: '16px',
            }}
          ></i>
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            fetchDataById(user, id);
          }}
          style={{
            padding: '5px 8px',
            marginLeft: '10px',
            backgroundColor: 'var(--purple)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '50px',
            justifySelf: 'flex-end',
            alignSelf: 'flex-start',
          }}
        >
          <i
            className='bi bi-pencil-square'
            style={{
              color: 'white',
              width: '25px',
              height: '25px',
              fontSize: '16px',
            }}
          ></i>
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
          style={{
            padding: '5px 8px',
            marginLeft: '10px',
            backgroundColor: 'var(--purple)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '50px',
            justifySelf: 'flex-end',
            alignSelf: 'flex-start',
          }}
        >
          <i
            className='bi bi-reply-fill'
            style={{
              color: 'white',
              width: '25px',
              height: '25px',
              fontSize: '16px',
            }}
          ></i>
        </button>
      </div>
      <div className={styles.tabs}>
        <div
          onClick={() => setActiveTab('lyrics')}
          className={`${styles.tab} ${
            activeTab === 'lyrics' ? styles.active : ''
          }`}
        >
          Letras
        </div>
        <div
          onClick={() => setActiveTab('chords')}
          className={`${styles.tab} ${
            activeTab === 'chords' ? styles.active : ''
          }`}
        >
          Acordes
        </div>
      </div>
      <SongContent
        activeTab={activeTab}
        fontSizeLyrics={fontSizeLyrics}
        fontSizeChords={fontSizeChords}
        song={song}
      />
      <ScrollBar
        setFontSizeLyrics={setFontSizeLyrics}
        setFontSizeChords={setFontSizeChords}
        fontSizeLyrics={fontSizeLyrics}
        fontSizeChords={fontSizeChords}
        song={song}
        activeTab={activeTab}
        handleChange={handleChange}
        handleSaveEdit={handleSaveEdit}
      />
      {isModalOpen && (
        <Modal>
          <button
            className={styles['modal-close']}
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
          <h2 style={{ color: 'var(--oscuroLetra)' }}>Agregar Nueva Canción</h2>
          <NewSongForm
            onCloseModal={() => setIsModalOpen(false)}
            isSongEdit={true}
            song={song}
          />
        </Modal>
      )}
      {isModalDeleteOpen && (
        <Modal>
          {song.title ? (
            <h3>{`¿Deseas eliminar la canción "${song.title}"?`}</h3>
          ) : (
            <h3>¿Estás seguro?</h3>
          )}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => handleDeleteClick()}
              style={{
                padding: '10px 15px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Eliminar
            </button>
            <button
              onClick={() => setIsModalDeleteOpen(false)}
              style={{
                padding: '10px 15px',
                backgroundColor: 'var(--purple)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
