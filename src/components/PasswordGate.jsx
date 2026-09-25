import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/pixelact-ui/button';
import { Input } from '@/components/ui/pixelact-ui/input';
import { Label } from '@/components/ui/pixelact-ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/pixelact-ui/card';
import { auth } from '../firebase';
import { GUEST_EMAIL } from '../authConfig';
import './PasswordGate.css';

// Open eye is your own PNG (see public/images/eye.png). Closed eye is
// still a small hand-built pixel icon.
function PixelEyeOpen() {
  return (
    <img
      src="images\eye.png"
      alt=""
      width="16"
      height="16"
      className="gate-eye-icon"
    />
  );
}

function PixelEyeClosed() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges" fill="currentColor">
      <rect x="0" y="6" width="16" height="2" />
      <rect x="1" y="9" width="2" height="2" />
      <rect x="7" y="9" width="2" height="2" />
      <rect x="13" y="9" width="2" height="2" />
    </svg>
  );
}

export default function PasswordGate() {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);
  const [revealed, setRevealed] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setChecking(true);
    try {
      // The guess is sent straight to Firebase's own servers to
      // check — the real word is never present in this app's code.
      // Success here triggers App.jsx's onAuthStateChanged listener,
      // which swaps in the wishlist page automatically.
      await signInWithEmailAndPassword(auth, GUEST_EMAIL, value.trim());
    } catch (err) {
      console.error('Sign-in failed:', err.code, err.message);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 400);
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="gate-screen">
      <form
        className={`gate-form ${shake ? 'gate-shake' : ''}`}
        onSubmit={handleSubmit}
      >
        <Card className="gate-card">
          <CardHeader>
            <CardTitle className="gate-title">
              ✦♥ Birthday WIshlist ♥✦
            </CardTitle>
            <CardDescription className="gate-subtitle">
              Whats the secret word? (˵ ¬ᴗ¬˵)
            </CardDescription>
          </CardHeader>

          <CardContent className="gate-content">
            <Label htmlFor="secret-word" className="gate-label">
              Secret word
            </Label>
            <div className="gate-input-wrap">
              <Input
                id="secret-word"
                className="gate-input"
                type={revealed ? 'text' : 'password'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="secret word..."
                autoFocus
              />
              <button
                type="button"
                className="gate-input-reveal"
                onClick={() => setRevealed((prev) => !prev)}
                aria-label={revealed ? 'Hide secret word' : 'Show secret word'}
              >
                {revealed ? <PixelEyeClosed /> : <PixelEyeOpen />}
              </button>
            </div>
          </CardContent>

          <CardFooter className="gate-footer">
            <Button
              type="submit"
              variant="secondary"
              className="gate-submit"
              disabled={checking}
            >
              {checking ? 'Checking…' : 'Unlock'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}