import { useState } from 'react';
import styles from './NewSongForm.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './SongForm.css';
import { genres, modules, formats } from '../../helpers/index';
import { useNavigate } from 'react-router-dom';

function NewSongForm({ onCloseModal }) {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [genre, setGenre] = useState('Ninguno');
  const [chords, setChords] = useState('');
  const [scrollSpeed, setScrollSpeed] = useState(0.5);
  const [fontSize, setFontSize] = useState(16);
  const [fontSizeLyrics, setFontSizeLyrics] = useState(16);
  const [fontSizeChords, setFontSizeChords] = useState(16);
  const [scrollSpeedLyrics, setScrollSpeedLyrics] = useState(0.5);
  const [scrollSpeedChords, setScrollSpeedChords] = useState(0.5);
  const [activeTab, setActiveTab] = useState('lyrics');
  const navigate = useNavigate();

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(e.target.value);
    setScrollSpeed(speed);
    setScrollSpeedLyrics(speed);
    setScrollSpeedChords(speed);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);
    setFontSize(size);
    setFontSizeLyrics(size);
    setFontSizeChords(size);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (artist && title && lyrics && genre) {
      const newSong = {
        artist,
        title,
        lyrics,
        genre,
        chords,
        scrollSpeedLyrics,
        scrollSpeedChords,
        fontSizeLyrics,
        fontSizeChords,
      };

      try {
        //createSong(newSong);
        setArtist('');
        setTitle('');
        setLyrics('');
        setGenre('');
        setChords('');
        setScrollSpeed(0.5);
        setFontSize(16);
        navigate('/');
        onCloseModal();
      } catch (error) {
        console.error('Error al agregar la canción: ', error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--oscuroLetra)',
      }}
      className={styles.formulario}
    >
      <p>Título</p>
      <input
        type='text'
        placeholder='Título'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <p>Artista</p>
      <input
        type='text'
        placeholder='Artista'
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <p>Género</p>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ marginBottom: '10px' }}
        required
      >
        <option value='Ninguno'>Seleccionar Género</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <p>Letra</p>
      <div>
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

        <div
          className={styles['custom-quill']}
          style={{
            '--editor-font-size': `${fontSize}px`,
            '--editor-line-height': `${fontSize * 1.5}px`,
          }}
        >
          {activeTab === 'lyrics' && (
            <ReactQuill
              value={lyrics}
              onChange={setLyrics}
              modules={modules}
              formats={formats}
              theme='snow'
              placeholder='Escribe las letras aquí...'
            />
          )}

          {activeTab === 'chords' && (
            <ReactQuill
              value={chords}
              onChange={setChords}
              modules={modules}
              formats={formats}
              theme='snow'
              placeholder='Escribe los acordes aquí...'
            />
          )}
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label
          htmlFor='fontSize'
          style={{
            marginRight: '10px',
          }}
        >
          Tamaño de fuente:
        </label>
        <select
          id='fontSize'
          value={fontSize}
          onChange={handleFontSizeChange}
          style={{ marginBottom: '10px' }}
        >
          <option value={12}>12 px</option>
          <option value={14}>14 px</option>
          <option value={16}>16 px</option>
          <option value={18}>18 px</option>
          <option value={20}>20 px</option>
          <option value={24}>24 px</option>
          <option value={28}>28 px</option>
          <option value={32}>32 px</option>
        </select>
      </div>

      <div>
        <label htmlFor='scrollSpeed' style={{ marginRight: '10px' }}>
          Velocidad:
        </label>
        <input
          id='scrollSpeed'
          type='range'
          min='0.10'
          max='1'
          step='0.05'
          value={scrollSpeed}
          onChange={handleSpeedChange}
          style={{ verticalAlign: 'middle' }}
          className={styles['scroll-speed-slider']}
        />
        <label>{scrollSpeed.toFixed(1)}x</label>
      </div>

      <button
        type='submit'
        // disabled={isSubmitting}
        style={{
          padding: '10px 15px',
          backgroundColor: 'var(--oscuro)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        {'Crear'}
      </button>
    </form>
  );
}

export default NewSongForm;
