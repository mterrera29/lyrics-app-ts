type IncreaseFontsProps = {
  setFontSizeLyrics: React.Dispatch<React.SetStateAction<number>>;
  setFontSizeChords: React.Dispatch<React.SetStateAction<number>>;
  fontSizeLyrics: number;
  fontSizeChords: number;
  activeTab: string;
  handleChange: (e: { target: { name: string; value: number } }) => void;
};

const IncreaseFonts = ({
  handleChange,
  activeTab,
  setFontSizeLyrics,
  setFontSizeChords,
  fontSizeLyrics,
  fontSizeChords,
}: IncreaseFontsProps) => {
  const increaseFontSize = () => {
    if (activeTab === 'lyrics') {
      const newFontSize = Math.min(fontSizeLyrics + 2, 32);
      setFontSizeLyrics(newFontSize);
      handleChange({ target: { name: 'fontSizeLyrics', value: newFontSize } });
    } else {
      const newFontSize = Math.min(fontSizeChords + 2, 32);
      setFontSizeChords(newFontSize);
      handleChange({ target: { name: 'fontSizeChords', value: newFontSize } });
    }
  };

  const decreaseFontSize = () => {
    if (activeTab === 'lyrics') {
      const newFontSize = Math.max(fontSizeLyrics - 2, 12);
      setFontSizeLyrics(newFontSize);
      handleChange({ target: { name: 'fontSizeLyrics', value: newFontSize } });
    } else {
      const newFontSize = Math.max(fontSizeChords - 2, 12);
      setFontSizeChords(newFontSize);
      handleChange({ target: { name: 'fontSizeChords', value: newFontSize } });
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '10px',
          flexWrap: 'nowrap',
          marginRight: '10px',
        }}
      >
        <button
          onClick={increaseFontSize}
          style={{
            padding: '5px',
            backgroundColor: 'var(--oscuro)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
          }}
        >
          <i className='bi bi-caret-up-fill'></i>
        </button>
        <p style={{ margin: '0px', marginLeft: '2px', marginRight: '2px' }}>
          {activeTab === 'lyrics'
            ? `${fontSizeLyrics}px`
            : `${fontSizeChords}px`}
        </p>
        <button
          onClick={decreaseFontSize}
          style={{
            padding: '5px',
            backgroundColor: 'var(--oscuro)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '30px',
            height: '30px',
          }}
        >
          <i className='bi bi-caret-down-fill'></i>
        </button>
      </div>
    </div>
  );
};

export default IncreaseFonts;
