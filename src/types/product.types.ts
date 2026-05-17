export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  rating: number;
  ratingCount: number;
  badge?: 'new' | 'hot';
  colorSwatches?: string[];
};
