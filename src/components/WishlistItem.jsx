import { Pixel } from '@react-pixel-ui/react';
import PriceBadge from './PriceBadge';

export default function WishlistItem({ item, onSetPurchased }) {
  const { name, url, image, price, purchased } = item;

  return (
    <Pixel size={4}>
      <div className={`item-card ${purchased ? 'item-card-purchased' : ''}`}>
        <div className="item-image-wrap">
          <img src={image} alt={name} className="item-image" />
        </div>

        <div className="item-body">
          <div className="item-header">
            <h3 className="item-name">{name}</h3>
            <PriceBadge tier={price} />
          </div>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="item-link"
            >
              View item ↗
            </a>
          )}

          <div className="item-buttons">
            <button
              className={`item-mark ${purchased ? 'item-mark-active' : ''}`}
              onClick={() => onSetPurchased(item.id, true)}
              disabled={purchased}
            >
              Mark
            </button>
            <button
              className={`item-unmark ${!purchased ? 'item-unmark-active' : ''}`}
              onClick={() => onSetPurchased(item.id, false)}
              disabled={!purchased}
            >
              Unmark
            </button>
          </div>
        </div>
      </div>
    </Pixel>
  );
}