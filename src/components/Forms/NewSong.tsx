import { useEffect, useRef, useState } from 'react';
import styles from './NewSongForm.module.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { genres, modules, formats } from '../../helpers/index';
import { useNavigate } from 'react-router-dom';
import { useSongsStore } from '../../stores/songStore';
import { useAuthStore } from '../../stores/authStore';
import { Song } from '../../types';

type NewSongProps = {
  onCloseModal: () => void;
  isSongEdit: boolean;
  song: Song;
};

function NewSongForm({ onCloseModal, isSongEdit, song }: NewSongProps) {
  const fetchData = useSongsStore((state) => state.fetchData);
  const createNewSong = useSongsStore((state) => state.createNewSong);
  const user = useAuthStore((state) => state.user);
  const isSong = isSongEdit ? true : false;
  const [artist, setArtist] = useState(isSong ? song.artist : '');
  const [title, setTitle] = useState(song.title);
  const [lyrics, setLyrics] = useState(isSong ? song.lyrics : '');
  const [genre, setGenre] = useState(isSong ? song.genre : 'Ninguno');
  const [chords, setChords] = useState(isSong ? song.chords : '');
  const [scrollSpeed, setScrollSpeed] = useState(0.5);
  const [fontSize, setFontSize] = useState(isSong ? song.fontSizeChords : 16);
  const [fontSizeLyrics, setFontSizeLyrics] = useState(
    isSong ? song.fontSizeLyrics : 16
  );
  const [fontSizeChords, setFontSizeChords] = useState(
    isSong ? song.fontSizeChords : 16
  );
  const [scrollSpeedLyrics, setScrollSpeedLyrics] = useState(
    isSong ? song.scrollSpeedLyrics : 0.5
  );
  const [scrollSpeedChords, setScrollSpeedChords] = useState(
    isSong ? song.scrollSpeedChords : 0.5
  );
  const [activeTab, setActiveTab] = useState('lyrics');
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const songEdit = useSongsStore((state) => state.songEdit);
  const [editedSong, setEditedSong] = useState(song);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--editor-font-size', `${fontSize}px`);
      ref.current.style.setProperty(
        '--editor-line-height',
        `${fontSize * 1.5}px`
      );
    }
  }, [fontSize]);

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
    setEditedSong((prev) => ({
      ...prev,
      artist,
      title,
      lyrics,
      genre,
      chords,
      scrollSpeedLyrics,
      scrollSpeedChords,
      fontSizeLyrics,
      fontSizeChords,
    }));

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
      console.log(editedSong);

      try {
        if (user && isSong) {
          songEdit(user, song.id, editedSong);
        } else if (user) {
          createNewSong(user, newSong);
          fetchData(user);
        }
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
        className={styles.formInput}
      />
      <p>Artista</p>
      <input
        type='text'
        placeholder='Artista'
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
        className={styles.formInput}
      />
      <p>Género</p>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ marginBottom: '10px' }}
        required
        className={styles.formSelect}
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

        <div className={styles['custom-quill']} ref={ref}>
          {activeTab === 'lyrics' && (
            <ReactQuill
              value={lyrics}
              onChange={setLyrics}
              modules={modules}
              formats={formats}
              theme='snow'
              placeholder='Escribe las letras aquí...'
              className={styles['ql-editor']}
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
              className={styles['ql-editor']}
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
          backgroundColor: 'var(--purple)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        {isSong ? 'Editar' : 'Crear'}
      </button>
    </form>
  );
}

export default NewSongForm;
