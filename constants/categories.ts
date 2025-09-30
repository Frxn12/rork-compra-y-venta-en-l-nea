import { Category } from '@/types/product';

export const CATEGORIES: { id: Category; name: string; emoji: string }[] = [
  { id: 'electronics', name: 'Electrónica', emoji: '📱' },
  { id: 'furniture', name: 'Muebles', emoji: '🛋️' },
  { id: 'clothing', name: 'Ropa', emoji: '👕' },
  { id: 'vehicles', name: 'Vehículos', emoji: '🚗' },
  { id: 'sports', name: 'Deportes', emoji: '⚽' },
  { id: 'books', name: 'Libros', emoji: '📚' },
  { id: 'home', name: 'Hogar', emoji: '🏠' },
  { id: 'toys', name: 'Juguetes', emoji: '🧸' },
  { id: 'other', name: 'Otros', emoji: '📦' },
];
