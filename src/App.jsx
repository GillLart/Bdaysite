import { useState } from 'react';
import PasswordGate from './components/PasswordGate';
import WishlistPage from './components/WishlistPage';
import FallingBackground from './components/FallingBackground';
import './pixelTheme.css';

function App() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('wishlist-unlocked') === 'true'
  );

  return (
    <>
      <FallingBackground />
      {unlocked ? (
        <WishlistPage />
      ) : (
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      )}
    </>
  );
}

export default App;