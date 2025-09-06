import { Star, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    seller: string;
    rating: number;
    category: string;
    condition: string;
  };
  onMessageSeller: (productId: number) => void;
  onProductClick: (productId: number) => void;
}

export function ProductCard({ product, onMessageSeller, onProductClick }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden bg-card border border-border rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div onClick={() => onProductClick(product.id)}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm"
          >
            {product.condition}
          </Badge>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                ${product.price}
              </span>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{product.seller}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{product.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onMessageSeller(product.id);
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Message Seller
        </Button>
      </div>
    </Card>
  );
}