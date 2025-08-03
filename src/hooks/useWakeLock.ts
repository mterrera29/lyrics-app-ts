import { useEffect, useRef, useCallback } from 'react';

type WakeLockType = 'screen';

interface WakeLock {
  request: (type: WakeLockType) => Promise<WakeLockSentinel>;
}

type MaybeWakeLock = {
  wakeLock?: WakeLock;
};

export function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const requestWakeLock = useCallback(async () => {
    try {
      const nav = navigator as Navigator & MaybeWakeLock;

      if (nav.wakeLock?.request) {
        const lock = await nav.wakeLock.request('screen');
        wakeLockRef.current = lock;
        console.log('🔒 Wake Lock activado');

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
    const currentLock = wakeLockRef.current;
    if (currentLock) {
      await currentLock.release();
      wakeLockRef.current = null;
      console.log('🔓 Wake Lock desactivado');
    }
  }, []);

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

  return { requestWakeLock, releaseWakeLock };
}
