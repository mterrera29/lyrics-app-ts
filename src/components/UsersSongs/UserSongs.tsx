import { useEffect, useState } from 'react';
import UserFilteredSongs from './UserFilteredSongs';
import { Song } from '../../types';
import styles from './UserSongs.module.css';
import Categories from './ButtonsCategory/Categories/Categories';
import UserFilteredAuthors from './UserFIlteredAuthors';
import UserFilteredGenres from './UserFilteredGenres';

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
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortArtist, setSortArtist] = useState('asc');
  const [sortGenre, setSortGenre] = useState('asc');

  const [artist, setArtist] = useState([
    ...new Set(songs.map((song) => song.artist)),
  ]);
  const [genres, setGenres] = useState([
    ...new Set(songs.map((song) => song.genre)),
  ]);
  console.log(selectedAuthor, filteredSongs);
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
    const newArtist = [...new Set(filtered.map((song) => song.artist))];
    const sortedArtist = newArtist.sort((a, b) =>
      sortArtist === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
    setArtist(sortedArtist);

    setFilteredSongs(sorted);
    const newGenres = [...new Set(filtered.map((song) => song.genre))];
    const sortedGenre = newGenres.sort((a, b) =>
      sortGenre === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
    setGenres(sortedGenre);
  }, [
    selectedAuthor,
    selectedGenre,
    searchQuery,
    songs,
    sortOrder,
    sortArtist,
    sortGenre,
  ]);

  useEffect(() => {}, [filteredSongs]);

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
      {selectedButton.id === 0 && (
        <UserFilteredSongs
          songs={filteredSongs}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      )}
      {selectedButton.id === 1 &&
        (selectedAuthor ? (
          <UserFilteredSongs
            songs={filteredSongs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        ) : (
          <UserFilteredAuthors
            artist={artist}
            setSelectedAuthor={setSelectedAuthor}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortArtist={sortArtist}
            setSortArtist={setSortArtist}
          />
        ))}

      {selectedButton.id === 2 &&
        (selectedGenre ? (
          <UserFilteredSongs
            songs={filteredSongs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />
        ) : (
          <UserFilteredGenres
            genres={genres}
            setSelectedGenre={setSelectedGenre}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortGenre={sortGenre}
            setSortGenre={setSortGenre}
          />
        ))}
    </div>
  );
}
