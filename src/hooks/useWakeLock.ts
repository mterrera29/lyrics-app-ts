import { useEffect, useState, useCallback } from 'react';

// Solo definimos tipos auxiliares si no existen
type WakeLockType = 'screen';

interface WakeLock {
  request: (type: WakeLockType) => Promise<WakeLockSentinel>;
}

type MaybeWakeLock = {
  wakeLock?: WakeLock;
};

export function useWakeLock() {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const requestWakeLock = useCallback(async () => {
    try {
      const nav = navigator as Navigator & MaybeWakeLock;

      if (nav.wakeLock?.request) {
        const lock = await nav.wakeLock.request('screen');
        setWakeLock(lock);
        console.log('🔒 Wake Lock activado');

        // TypeScript espera una función con argumentos (ev), por eso lo dejamos opcional
        lock.onrelease = () => {
          console.log('🔓 Wake Lock liberado');
        };
      } else {
        console.warn('⚠️ Wake Lock API no está disponible en este navegador.');
      }
    } catch (error) {
      console.error('❌ Error al activar Wake Lock:', error);
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      await wakeLock.release();
      setWakeLock(null);
      console.log('🔓 Wake Lock desactivado');
    }
  }, [wakeLock]);

  useEffect(() => {
    requestWakeLock();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      releaseWakeLock();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [requestWakeLock, releaseWakeLock]);

  return { requestWakeLock, releaseWakeLock, wakeLock };
}
