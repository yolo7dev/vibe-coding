export type SwatchColor = {
  id: string;
  hex: string;
};

export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type ProductDetail = {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  colors: SwatchColor[];
  sizes: SizeOption[];
  gallery: string[];
  breadcrumb: string[];
};
