import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import styles from './Header.module.css';
import Modal from '../Modal/Modal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  return (
    <div className={styles['app-header']}>
      <div className={styles['hamburger-menu']} onClick={toggleMenu}>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`}></div>
      </div>

      <div
        className={`${styles['side-menu']} ${isMenuOpen ? styles.open : ''}`}
      >
        <nav>
          <ul>
            <li>
              <a
                href='#'
                onClick={() => {
                  closeMenu();
                  navigate('/');
                }}
              >
                Mis Canciones 🎶
              </a>
            </li>
            <li>
              <a
                href='#'
                onClick={() => {
                  closeMenu();
                  navigate('/lists');
                }}
              >
                Mis Listas 📝
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                style={{
                  padding: '10px 15px',
                  backgroundColor: 'var(--purple)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                }}
              >
                Nueva Canción 🎵
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles['title-container']}>
        <h2
          className={styles.title}
          onClick={() => {
            navigate('/');
          }}
        >
          🔥 Cancionero 🎸
        </h2>
      </div>
      <Avatar />
      {isModalOpen && (
        <Modal>
          <button
            className={styles['modal-close']}
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
          <h2 style={{ color: 'var(--oscuroLetra)' }}>Agregar Nueva Canción</h2>
          {/* <SongForm onCloseModal={() => setIsModalOpen(false)} /> */}
        </Modal>
      )}
    </div>
  );
};

export default Header;
