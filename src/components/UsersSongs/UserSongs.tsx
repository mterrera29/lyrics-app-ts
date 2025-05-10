import { useEffect, useState } from 'react';
import UserFilteredSongs from './UserFilteredSongs';
import { Song } from '../../types';
import styles from './UserSongs.module.css';
import Categories from './ButtonsCategory/Categories/Categories';

type UserSongsProps = {
  songs: Song[];
};

export default function UserSongs({ songs }: UserSongsProps) {
  const [selectedButton, setSelectedButton] = useState({
    id: 0,
    value: 'Todas',
  });
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  /*  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedSong: null,
  }); */
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const filtered: Song[] = songs.filter((song) => {
      const matchesAuthor =
        !selectedAuthor ||
        song.artist.toLowerCase() === selectedAuthor.toLowerCase();
      const matchesGenre = !selectedGenre || song.genre === selectedGenre;
      const matchesSearch =
        !searchQuery ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesAuthor && matchesGenre && matchesSearch;
    });

    const sorted = filtered.sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    setFilteredSongs(sorted);
  }, [selectedAuthor, selectedGenre, searchQuery, songs, sortOrder]);

  useEffect(() => {
    setSelectedAuthor('');
    setSelectedGenre('');
    setSearchQuery('');
  }, [selectedButton]);

  return (
    <div className={styles.container}>
      <Categories
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {selectedButton.id === 1 && (
          <div className={styles.searchQuery}>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className={styles.select}
            >
              <option value=''>Todos los Artistas </option>
              {[...new Set(songs.map((song) => song.artist))].map(
                (author, index) => (
                  <option key={index} value={author}>
                    {author}
                  </option>
                )
              )}
            </select>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <input
                type='text'
                placeholder='Buscar canción...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        )}
        {selectedButton.id === 2 && (
          <div className={styles.searchQuery}>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={styles.select}
            >
              <option value=''>Todos los Géneros </option>
              {[...new Set(songs.map((song) => song.genre))].map(
                (genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                )
              )}
            </select>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <input
                type='text'
                placeholder='Buscar canción...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        )}
        {selectedButton.id === 0 && (
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
        )}
        <div
          onClick={() =>
            setSortOrder((prev) => {
              if (prev === 'asc') {
                return 'des';
              } else {
                return 'asc';
              }
            })
          }
        >
          <div className={styles.sort}>
            {sortOrder === 'asc' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='25'
                fill='currentColor'
                className={styles.sortIcon}
                viewBox='0 0 16 16'
              >
                <path
                  fill-rule='evenodd'
                  d='M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z'
                />
                <path d='M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='25'
                fill='currentColor'
                className={styles.sortIcon}
                viewBox='0 0 16 16'
              >
                <path d='M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z' />
                <path
                  fill-rule='evenodd'
                  d='M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z'
                />
                <path d='M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z' />
              </svg>
            )}
          </div>
        </div>
      </div>
      {songs.length === 0 ? (
        <p>No hay canciones.</p>
      ) : (
        <UserFilteredSongs songs={filteredSongs} />
      )}
    </div>
  );
}
