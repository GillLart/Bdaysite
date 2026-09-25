import { useState } from 'react';
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
        <form
          className={`gate-card ${shake ? 'gate-shake' : ''}`}
          onSubmit={handleSubmit}
        >
          <Card className = "gate-card">
            <CardHeader>
              <CardTitle className="gate-title">✦♥ Birthday WIshlist ♥✦</CardTitle>
              <CardDescription className="gate-subtitle">
                Whats the secret word? ( ͠° ͟ʖ ͡°) 
              </CardDescription>
            </CardHeader>
            <CardContent className="gate-content">
              <Label htmlFor="secret-word">Secret word</Label>
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
              <Button type="submit" variant="secondary" className="gate-submit">
                Unlock
              </Button>
            </CardFooter>
          </Card>
        </form>
    </div>
  );
}
