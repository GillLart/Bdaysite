import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/pixelact-ui/card';
import { Button } from '@/components/ui/pixelact-ui/button';
import PriceBadge from './PriceBadge';

export default function WishlistItem({ item, onSetPurchased }) {
  const { name, url, image, price, purchased } = item;

  return (
    <Card className={`item-card ${purchased ? 'item-card-purchased' : ''}`}>
        <div className="item-image-wrap">
          <img src={image} alt={name} className="item-image" />
        </div>

          <CardHeader className="item-header">
            <CardTitle className="item-name">{name}</CardTitle>
            <PriceBadge tier={price} />
          </CardHeader>

          {url && (
            <CardContent className="item-content">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="item-link"
              >
                View item ↗
              </a>
            </CardContent>
          )}

          <CardFooter className="item-buttons">
            <Button
              variant="success"
              size="sm"
              className="item-mark"
              onClick={() => onSetPurchased(item.id, true)}
              disabled={purchased}
            >
              Mark
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="item-unmark"
              onClick={() => onSetPurchased(item.id, false)}
              disabled={!purchased}
            >
              Unmark
            </Button>
          </CardFooter>
        </Card>

  );
}