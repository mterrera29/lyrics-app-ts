import { useEffect, useState } from 'react';
import UserFilteredSongs from './UserFilteredSongs';
import { Song } from '../../types';
type UserSongsProps = {
  songs: Song[];
};

export default function UserSongs({ songs }: UserSongsProps) {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    selectedSong: null,
  });

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

    setFilteredSongs(filtered);
    console.log(filtered);
  }, [selectedAuthor, selectedGenre, searchQuery, songs]);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <div>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value=''>Todos los Autores</option>
            {[...new Set(songs.map((song) => song.artist))].map(
              (author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value=''>Todos los Géneros</option>
            {[...new Set(songs.map((song) => song.genre))].map(
              (genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        <input
          type='text'
          placeholder='Buscar canción...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      {songs.length === 0 ? (
        <p>No hay canciones aún.</p>
      ) : (
        <UserFilteredSongs songs={filteredSongs} />
      )}
    </div>
  );
}
