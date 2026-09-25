import { useEffect, useState } from 'react';
import WishlistItem from './WishlistItem';
import { defaultWishlist } from '../data/wishlistItems';
import './WishlistPage.css';

const STORAGE_KEY = 'wishlist-purchased';

function loadPurchasedMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function WishlistPage() {
  const [purchasedMap, setPurchasedMap] = useState(loadPurchasedMap);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchasedMap));
  }, [purchasedMap]);

  function setPurchased(id, value) {
    setPurchasedMap((prev) => ({ ...prev, [id]: value }));
  }

  const items = defaultWishlist.map((item) => ({
    ...item,
    purchased: !!purchasedMap[item.id],
  }));

  const columns = [
    { tier: 1, label: '£: 2< price <10', items: items.filter((item) => item.price === 1) },
    { tier: 2, label: '££: 10<= price <=20', items: items.filter((item) => item.price === 2) },
    { tier: 3, label: '£££: 20< price', items: items.filter((item) => item.price === 3) },
  ];

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <h1 className="wishlist-title">Gillian's Wishlist </h1> 
        <p className="wishlist-subtitle">Yes I was procrastinating doing work when I made this :p</p>
        <p className="wishlist-subtitle">press mark to "mark" as purchesed and "unmark" to undo this</p>
      </header>

      <div className="wishlist-columns">
        {columns.map((column) => (
          <div className="wishlist-column" key={column.tier}>
            <div className={`wishlist-column-label price-badge-${column.tier}`}>
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