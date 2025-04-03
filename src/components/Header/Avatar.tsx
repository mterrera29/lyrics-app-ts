import { useState, useEffect } from 'react';
import unlogged from '../../assets/unlogged.png';
import { useAuthStore } from '../../stores/authStore';
import styles from './Avatar.module.css';

const Avatar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    } else {
      setPhotoURL(unlogged);
    }
  }, [user]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles['user-avatar']} onClick={toggleMenu}>
        <img
          src={photoURL || unlogged}
          alt='User Avatar'
          className={styles.avatar}
          referrerPolicy='no-referrer'
        />
      </div>

      {isMenuOpen && (
        <div className={styles['dropdown-menu']}>
          {user ? (
            <>
              <p className={styles['user-name']}>
                {user.displayName || 'Usuario'}
              </p>
              <button onClick={logout} className={styles['dropdown-button']}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={login} className={styles['dropdown-button']}>
              Ingresar
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Avatar;
