import { useState, useRef, useEffect } from 'react';
import IncreaseFonts from './IncreaseFonts';
import { Song } from '../../types';
import styles from './ScrollBar.module.css';

type ScrollBarProps = {
  song: Song;
  setFontSizeLyrics: React.Dispatch<React.SetStateAction<number>>;
  setFontSizeChords: React.Dispatch<React.SetStateAction<number>>;
  fontSizeLyrics: number;
  fontSizeChords: number;
  activeTab: string;
  handleChange: (e: { target: { name: string; value: number } }) => void;
};
const ScrollBar = ({
  song,
  setFontSizeLyrics,
  setFontSizeChords,
  fontSizeLyrics,
  fontSizeChords,
  activeTab,
  handleChange,
}: ScrollBarProps) => {
  const minSpeed = 0.1;
  const maxSpeed = 1;

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeedLyrics, setScrollSpeedLyrics] = useState(
    song?.scrollSpeedLyrics || (minSpeed + maxSpeed) / 3
  );
  const [scrollSpeedChords, setScrollSpeedChords] = useState(
    song?.scrollSpeedChords || (minSpeed + maxSpeed) / 3
  );
  const scrollInterval = useRef(null);
  const scrollAccumulator = useRef(0);

  useEffect(() => {
    if (song) {
      if (song.scrollSpeedLyrics) {
        setScrollSpeedLyrics(song.scrollSpeedLyrics);
      }
      if (song.scrollSpeedChords) {
        setScrollSpeedChords(song.scrollSpeedChords);
      }
    }
  }, [song]);

  const startScrolling = () => {
    if (!isScrolling) {
      setIsScrolling(true);
      scrollInterval.current = setInterval(() => {
        scrollAccumulator.current +=
          activeTab === 'lyrics' ? scrollSpeedLyrics : scrollSpeedChords;

        if (scrollAccumulator.current >= 1) {
          const scrollAmount = Math.floor(scrollAccumulator.current);
          window.scrollBy(0, scrollAmount);
          scrollAccumulator.current -= scrollAmount;
        }

        const isAtBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if (isAtBottom) {
          stopScrolling();
        }
      }, 50);
    }
  };

  const stopScrolling = () => {
    setIsScrolling(false);
    clearInterval(scrollInterval.current);
    scrollAccumulator.current = 0;
  };

  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);

    if (activeTab === 'lyrics') {
      setScrollSpeedLyrics(newSpeed);
      handleChange({ target: { name: 'scrollSpeedLyrics', value: newSpeed } });
    } else {
      setScrollSpeedChords(newSpeed);
      handleChange({ target: { name: 'scrollSpeedChords', value: newSpeed } });
    }

    handleChange({ target: { name: 'scrollSpeed', value: newSpeed } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveEdit();
  };

  useEffect(() => {
    return () => clearInterval(scrollInterval.current);
  }, []);

  return (
    <div className={styles['scroll-controls']}>
      <button
        onClick={isScrolling ? stopScrolling : startScrolling}
        style={{
          padding: '5px 5x',
          backgroundColor: isScrolling ? '#dc3545' : 'var(--purple)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft: '10px',
          width: '40px',
          height: '40px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isScrolling ? (
          <i className='bi bi-stop-fill' style={{ fontSize: '20px' }}></i>
        ) : (
          <i className='bi bi-play-fill' style={{ fontSize: '20px' }}></i>
        )}
      </button>
      <span style={{ marginLeft: '10px', marginRight: '10px' }}>
        {(activeTab === 'lyrics'
          ? scrollSpeedLyrics
          : scrollSpeedChords
        ).toFixed(1)}
        x
      </span>
      <input
        id='scrollSpeed'
        type='range'
        min={minSpeed}
        max={maxSpeed}
        step='0.05'
        value={activeTab === 'lyrics' ? scrollSpeedLyrics : scrollSpeedChords}
        onChange={handleSpeedChange}
        style={{ verticalAlign: 'middle' }}
        className={styles['scroll-speed-slider']}
      />
      <div>
        <IncreaseFonts
          activeTab={activeTab}
          setFontSizeLyrics={setFontSizeLyrics}
          setFontSizeChords={setFontSizeChords}
          fontSizeLyrics={fontSizeLyrics}
          fontSizeChords={fontSizeChords}
          handleChange={handleChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: '5px',
          backgroundColor: 'var(--purple)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '5px',
          width: '30px',
          height: '30px',
        }}
      >
        <i className='bi bi-floppy-fill'></i>
      </button>
    </div>
  );
};

export default ScrollBar;
