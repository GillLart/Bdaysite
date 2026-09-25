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

export default function PasswordGate() {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);

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
              Whats the secret word? (≖_≖ )
            </CardDescription>
          </CardHeader>

          <CardContent className="gate-content">
            <Label htmlFor="secret-word" className="gate-label">
              Secret word
            </Label>
            <Input
              id="secret-word"
              className="gate-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="secret word..."
              autoFocus
            />
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