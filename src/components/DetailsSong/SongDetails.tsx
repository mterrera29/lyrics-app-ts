import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SongContent from './SongContent';
import { Song } from '../../types';
import styles from './SongDetails.module.css';
type SongContentProps = {
  song: Song;
};

export default function SongDetails({ song }: SongContentProps) {
  const [fontSizeLyrics, setFontSizeLyrics] = useState(16);
  const [fontSizeChords, setFontSizeChords] = useState(16);
  const [activeTab, setActiveTab] = useState('lyrics');
  const navigate = useNavigate();
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
      <button
        onClick={() => {
          navigate(-1);
        }}
        style={{
          padding: '10px 15px',
          backgroundColor: 'var(--oscuro)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '50px',
          position: 'absolute',
          right: '0',
        }}
      >
        <i className='bi bi-reply-fill'></i>
      </button>
      <h2 style={{ margin: '0', marginRight: '60px' }}>{song.title}</h2>
      <h3 style={{ margin: '0', marginRight: '60px' }}>{song.artist}</h3>
      <p style={{ margin: '0', marginRight: '60px' }}>{song.genre}</p>
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
    </div>
  );
}
