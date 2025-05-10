import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SongContent from '../components/DetailsSong/SongContent.tsx';
import { useSongsStore } from '../stores/songStore.js';

function SongDetailsPage() {
  const { id } = useParams();
  const songs = useSongsStore((state) => state.songs);
  const filterSong = songs.filter((song) => song.id === id);
  const song = filterSong[0];
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

  if (!song) {
    return (
      <div className='spinner'>
        <div className='spinner-inner'></div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        position: 'relative',
      }}
    >
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
      <div className='tabs'>
        <div
          onClick={() => setActiveTab('lyrics')}
          className={`tab ${activeTab === 'lyrics' ? 'active' : ''}`}
        >
          Letras
        </div>
        <div
          onClick={() => setActiveTab('chords')}
          className={`tab ${activeTab === 'chords' ? 'active' : ''}`}
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

export default SongDetailsPage;
