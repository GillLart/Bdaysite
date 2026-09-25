import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import WishlistItem from './WishlistItem';
import { defaultWishlist } from '../data/wishlistItems';
import './WishlistPage.css';

// One shared document holds { "1": true, "2": false, ... } —
// item id -> purchased. Every visitor reads and writes this same doc,
// so marking/unmarking is visible to everyone, on every device,
// permanently (not just in one browser's local storage).
const purchasedDocRef = doc(db, 'wishlist', 'purchased');

export default function WishlistPage() {
  const [purchasedMap, setPurchasedMap] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // onSnapshot keeps listening — if someone else marks an item,
    // this page updates automatically, no refresh needed.
    const unsubscribe = onSnapshot(purchasedDocRef, (snapshot) => {
      setPurchasedMap(snapshot.exists() ? snapshot.data() : {});
      setLoaded(true);
    });
    return unsubscribe;
  }, []);

  async function setPurchased(id, value) {
    // Update local state immediately so the click feels instant;
    // the onSnapshot listener above reconciles with the server a
    // moment later (and is what every other visitor sees update).
    setPurchasedMap((prev) => ({ ...prev, [id]: value }));
    try {
      await setDoc(purchasedDocRef, { [id]: value }, { merge: true });
    } catch (err) {
      console.error('Failed to save purchased state:', err);
    }
  }

  const items = defaultWishlist.map((item) => ({
    ...item,
    purchased: !!purchasedMap[item.id],
  }));

  const columns = [
    { tier: 1, symbol: '£', label: '£: 2< price <10', items: items.filter((item) => item.price === 1) },
    { tier: 2, symbol: '££', label: '££: 10<= price <=20', items: items.filter((item) => item.price === 2) },
    { tier: 3, symbol: '£££', label: '£££: 20< price', items: items.filter((item) => item.price === 3) },
  ];

  if (!loaded) {
    return (
      <div className="wishlist-page">
        <p className="wishlist-loading">Loading…</p>
      </div>
    );
  }

  const jumpLinks = columns.map((column) => (
    <a
      key={column.tier}
      href={`#price-tier-${column.tier}`}
      className={`wishlist-jump-link price-badge-${column.tier}`}
    >
      {column.symbol}
    </a>
  ));

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <h1 className="wishlist-title">Gillian's Wishlist </h1>
        <p className="wishlist-subtitle">
          Yes I was procrastinating doing work when I made this :p
        </p>
        <p className="wishlist-subtitle">
          press mark to "mark" as purchesed and "unmark" to undo this
        </p>
      </header>

      <nav className="wishlist-jump-nav" aria-label="Jump to price category">
        {jumpLinks}
      </nav>

      <div className="wishlist-columns">
        {columns.map((column) => (
          <div
            className="wishlist-column"
            id={`price-tier-${column.tier}`}
            key={column.tier}
          >
            <div
              className={`wishlist-column-label price-badge-${column.tier}`}
            >
              {column.label}
            </div>
            <div className="wishlist-column-items">
              {column.items.length === 0 ? (
                <p className="wishlist-column-empty">Nothing here yet</p>
              ) : (
                column.items.map((item) => (
                  <WishlistItem
                    key={item.id}
                    item={item}
                    onSetPurchased={setPurchased}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}