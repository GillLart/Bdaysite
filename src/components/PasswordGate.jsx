import { useState } from 'react';
import { Pixel } from '@react-pixel-ui/react';
import './PasswordGate.css';

// Change this to your real secret word.
const DEFAULT_PASSWORD = 'pookiebe@r';

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim().toLowerCase() === DEFAULT_PASSWORD.toLowerCase()) {
      sessionStorage.setItem('wishlist-unlocked', 'true');
      onUnlock();
    } else {
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 400);
    }
  }

  return (
    <div className="gate-screen">
      <Pixel size={5}>
        <form
          className={`gate-card ${shake ? 'gate-shake' : ''}`}
          onSubmit={handleSubmit}
        >
          <h1 className="gate-title">✦♥ Birthday WIshlist ♥✦</h1>
          <p className="gate-subtitle">Whats the secret word? ( ͠° ͟ʖ ͡°) </p>
          <input
            className="gate-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="secret word..."
            autoFocus
          />
          <Pixel size={3}>
            <button type="submit" className="gate-button">
              Unlock
            </button>
          </Pixel>
        </form>
      </Pixel>
    </div>
  );
}
