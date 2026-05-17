import type { Product } from '../../types/product.types';
import type { ProductDetail } from './types';

export const featuredProduct: ProductDetail = {
  id: 'havic-hv-g92',
  name: 'Havic HV G-92 Gamepad',
  price: 192,
  description:
    'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
  rating: 4,
  reviewCount: 150,
  inStock: true,
  colors: [
    { id: 'red', hex: '#DB4444' },
    { id: 'blue', hex: '#A0BCE0' },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  gallery: [
    'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1612801799795-d2738c5a3493?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=600&q=80',
  ],
  breadcrumb: ['Account', 'Gaming', 'Havic HV G-92 Gamepad'],
};

export const relatedItems: Product[] = [
  {
    id: 'rel-1',
    name: 'HAVIT HV-G92 Gamepad',
    image:
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80',
    price: 120,
    oldPrice: 160,
    discountPercent: 40,
    rating: 5,
    ratingCount: 88,
  },
  {
    id: 'rel-2',
    name: 'AK-900 Wired Keyboard',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    price: 960,
    oldPrice: 1160,
    discountPercent: 35,
    rating: 4,
    ratingCount: 75,
  },
  {
    id: 'rel-3',
    name: 'IPS LCD Gaming Monitor',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    price: 370,
    oldPrice: 400,
    discountPercent: 30,
    rating: 5,
    ratingCount: 99,
  },
  {
    id: 'rel-4',
    name: 'RGB Liquid CPU Cooler',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    ratingCount: 65,
    badge: 'new',
  },
];
