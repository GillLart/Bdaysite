import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import PasswordGate from './components/PasswordGate';
import WishlistPage from './components/WishlistPage';
import FallingBackground from './components/FallingBackground';
import './pixelTheme.css';

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Firebase persists the sign-in itself, so this fires immediately
    // with the right answer on every page load/refresh — no need for
    // our own sessionStorage flag anymore.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUnlocked(!!user);
      setCheckingSession(false);
    });
    return unsubscribe;
  }, []);

  if (checkingSession) {
    return <FallingBackground />;
  }

  return (
    <>
      <FallingBackground />
      {unlocked ? <WishlistPage /> : <PasswordGate />}
    </>
  );
}

export default App;