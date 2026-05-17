import type { Product } from '../../types/product.types';
import type { IconCategory, SidebarCategory } from './types';

export const sidebarCategories: SidebarCategory[] = [
  { label: "Woman's Fashion", hasMenu: true },
  { label: "Men's Fashion", hasMenu: true },
  { label: 'Electronics' },
  { label: 'Home & Lifestyle' },
  { label: 'Medicine' },
  { label: 'Sports & Outdoor' },
  { label: "Baby's & Toys" },
  { label: 'Groceries & Pets' },
  { label: 'Health & Beauty' },
];

export const iconCategories: IconCategory[] = [
  { label: 'Phones', icon: 'phone' },
  { label: 'Computers', icon: 'computer' },
  { label: 'SmartWatch', icon: 'watch' },
  { label: 'Camera', icon: 'camera' },
  { label: 'HeadPhones', icon: 'headphones' },
  { label: 'Gaming', icon: 'gamepad' },
];

export const flashSaleProducts: Product[] = [
  {
    id: 'fs-1',
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
    id: 'fs-2',
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
    id: 'fs-3',
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
    id: 'fs-4',
    name: 'S-Series Comfort Chair',
    image:
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80',
    price: 375,
    oldPrice: 400,
    discountPercent: 25,
    rating: 5,
    ratingCount: 99,
  },
];

export const bestSellingProducts: Product[] = [
  {
    id: 'bs-1',
    name: 'The North Coat',
    image:
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80',
    price: 260,
    oldPrice: 360,
    rating: 5,
    ratingCount: 65,
  },
  {
    id: 'bs-2',
    name: 'Gucci Duffle Bag',
    image:
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=600&q=80',
    price: 960,
    oldPrice: 1160,
    rating: 4.5,
    ratingCount: 65,
  },
  {
    id: 'bs-3',
    name: 'RGB Liquid CPU Cooler',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    ratingCount: 65,
  },
  {
    id: 'bs-4',
    name: 'Small BookSelf',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    price: 360,
    rating: 5,
    ratingCount: 65,
  },
];

export const exploreProducts: Product[] = [
  {
    id: 'ex-1',
    name: 'Breed Dry Dog Food',
    image:
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&q=80',
    price: 100,
    rating: 3,
    ratingCount: 35,
  },
  {
    id: 'ex-2',
    name: 'CANON EOS DSLR Camera',
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80',
    price: 360,
    rating: 4,
    ratingCount: 95,
  },
  {
    id: 'ex-3',
    name: 'ASUS FHD Gaming Laptop',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    price: 700,
    rating: 5,
    ratingCount: 325,
  },
  {
    id: 'ex-4',
    name: 'Curology Product Set',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    price: 500,
    rating: 4,
    ratingCount: 145,
  },
  {
    id: 'ex-5',
    name: 'Kids Electric Car',
    image:
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
    price: 960,
    rating: 5,
    ratingCount: 65,
    badge: 'new',
    colorSwatches: ['#EE5858', '#5470FF'],
  },
  {
    id: 'ex-6',
    name: 'Jr. Zoom Soccer Cleats',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    price: 1160,
    rating: 5,
    ratingCount: 35,
    colorSwatches: ['#EEFF61', '#000000'],
  },
  {
    id: 'ex-7',
    name: 'GP11 Shooter USB Gamepad',
    image:
      'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
    price: 660,
    rating: 4.5,
    ratingCount: 55,
    badge: 'new',
    colorSwatches: ['#000000', '#DB4444'],
  },
  {
    id: 'ex-8',
    name: 'Quilted Satin Jacket',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    price: 660,
    rating: 4.5,
    ratingCount: 55,
    colorSwatches: ['#184A48', '#DB4444'],
  },
];
