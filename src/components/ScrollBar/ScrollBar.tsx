import { useState, useRef, useEffect } from 'react';
import IncreaseFonts from './IncreaseFonts';
import { Song } from '../../types';
import styles from './ScrollBar.module.css';
import { useSongsStore } from '../../stores/songStore';

type ScrollBarProps = {
  song: Song;
  setFontSizeLyrics: React.Dispatch<React.SetStateAction<number>>;
  setFontSizeChords: React.Dispatch<React.SetStateAction<number>>;
  fontSizeLyrics: number;
  fontSizeChords: number;
  activeTab: string;
  handleChange: (e: { target: { name: string; value: number } }) => void;
  handleSaveEdit: () => void;
};

const ScrollBar = ({
  song,
  setFontSizeLyrics,
  setFontSizeChords,
  fontSizeLyrics,
  fontSizeChords,
  activeTab,
  handleChange,
  handleSaveEdit,
}: ScrollBarProps) => {
  const loading = useSongsStore((state) => state.loading);
  const minSpeed = 0.1;
  const maxSpeed = 1;

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeedLyrics, setScrollSpeedLyrics] = useState(
    song?.scrollSpeedLyrics || (minSpeed + maxSpeed) / 3
  );
  const [scrollSpeedChords, setScrollSpeedChords] = useState(
    song?.scrollSpeedChords || (minSpeed + maxSpeed) / 3
  );

  // NUEVO: Delay en segundos para empezar scroll
  const [delayTime, setDelayTime] = useState(5); // por defecto 5 seg
  const [progress, setProgress] = useState(0); // progreso de la barra de delay (0 a 1)

  const scrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayInterval = useRef<ReturnType<typeof setInterval> | null>(null);
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

  const stopAll = () => {
    setIsScrolling(false);
    if (scrollInterval.current !== null) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
    if (delayInterval.current !== null) {
      clearInterval(delayInterval.current);
      delayInterval.current = null;
    }
    scrollAccumulator.current = 0;
    setProgress(0);
  };

  const startScrolling = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setProgress(0);

    // Primero delay: que se llene la barra hasta delayTime
    let elapsed = 0;
    const delayStepMs = 50;
    delayInterval.current = setInterval(() => {
      elapsed += delayStepMs / 1000;
      const newProgress = Math.min(elapsed / delayTime, 1);
      setProgress(newProgress);

      if (elapsed >= delayTime) {
        // Termino delay, arranco scroll
        if (delayInterval.current) {
          clearInterval(delayInterval.current);
          delayInterval.current = null;
        }
        setProgress(1);
        startAutoScroll();
      }
    }, delayStepMs);
  };

  const startAutoScroll = () => {
    scrollAccumulator.current = 0;
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
        stopAll();
      }
    }, 50);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.target.value);

    if (activeTab === 'lyrics') {
      setScrollSpeedLyrics(newSpeed);
      handleChange({ target: { name: 'scrollSpeedLyrics', value: newSpeed } });
    } else {
      setScrollSpeedChords(newSpeed);
      handleChange({ target: { name: 'scrollSpeedChords', value: newSpeed } });
    }
  };

  // NUEVO: para cambiar delayTime (0 a 60 seg)
  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDelay = Number(e.target.value);
    setDelayTime(newDelay);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSaveEdit();
  };

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, []);

  return (
    <div>
      {/* Controles y slider velocidad (ya existentes) */}
      <div className={styles['scroll-controls']}>
        {/* Barra que muestra el progreso de delay (llenado) */}
        <div
          style={{
            height: '8px',
            width: '100%',
            backgroundColor: '#ddd',
            overflow: 'hidden',
            marginBottom: '4px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              backgroundColor: 'var(--purple)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2px',
          }}
        >
          <button
            onClick={() => {
              if (isScrolling) stopAll();
              else startScrolling();
            }}
            style={{
              padding: '5px 5x',
              backgroundColor: isScrolling ? '#dc3545' : 'var(--purple)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '10px',
              width: '36px',
              height: '36px',
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
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
              >
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
                value={
                  activeTab === 'lyrics' ? scrollSpeedLyrics : scrollSpeedChords
                }
                onChange={handleSpeedChange}
                style={{ verticalAlign: 'middle' }}
                className={styles['scroll-speed-slider']}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                {delayTime}s
              </span>
              <input
                id='delayRange'
                type='range'
                min={0}
                max={60}
                step={1}
                value={delayTime}
                onChange={handleDelayChange}
                style={{ verticalAlign: 'middle' }}
                className={styles['scroll-speed-slider']}
              />
            </div>
          </section>
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
              backgroundColor: loading
                ? 'var(--purpleOpacity2)'
                : 'var(--purple)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'progress' : 'pointer',
              marginRight: '5px',
              width: '30px',
              height: '30px',
            }}
            disabled={loading}
          >
            <i className='bi bi-floppy-fill'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollBar;
