import { Product } from '@/types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max',
    description: 'iPhone 13 Pro Max de 256GB en excelente estado. Incluye cargador original y caja. Sin rayones, batería al 95%.',
    price: 850,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800',
      'https://images.unsplash.com/photo-1632633728024-e1fd4bef561a?w=800',
    ],
    location: 'Madrid, España',
    seller: {
      name: 'Carlos García',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    createdAt: new Date('2025-09-28'),
    condition: 'like-new',
  },
  {
    id: '2',
    title: 'Sofá de 3 plazas',
    description: 'Sofá cómodo de 3 plazas en color gris. Perfecto estado, muy poco uso. Medidas: 220cm x 90cm x 85cm.',
    price: 350,
    category: 'furniture',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    ],
    location: 'Barcelona, España',
    seller: {
      name: 'María López',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    createdAt: new Date('2025-09-27'),
    condition: 'good',
  },
  {
    id: '3',
    title: 'Bicicleta de montaña',
    description: 'Bicicleta de montaña marca Trek, 21 velocidades. Ruedas 26", suspensión delantera. Ideal para rutas.',
    price: 280,
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800',
    ],
    location: 'Valencia, España',
    seller: {
      name: 'Juan Martínez',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    createdAt: new Date('2025-09-26'),
    condition: 'good',
  },
  {
    id: '4',
    title: 'MacBook Pro 14" M1',
    description: 'MacBook Pro 14 pulgadas con chip M1 Pro, 16GB RAM, 512GB SSD. Como nuevo, con garantía Apple hasta 2026.',
    price: 1800,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    ],
    location: 'Sevilla, España',
    seller: {
      name: 'Ana Rodríguez',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    createdAt: new Date('2025-09-25'),
    condition: 'like-new',
  },
  {
    id: '5',
    title: 'Chaqueta de cuero',
    description: 'Chaqueta de cuero genuino, talla M. Color negro, estilo motero. Muy buen estado, apenas usada.',
    price: 120,
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    ],
    location: 'Bilbao, España',
    seller: {
      name: 'Pedro Sánchez',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    createdAt: new Date('2025-09-24'),
    condition: 'good',
  },
  {
    id: '6',
    title: 'Mesa de comedor',
    description: 'Mesa de comedor extensible de madera maciza. 6-8 personas. Incluye 6 sillas. Perfecto estado.',
    price: 450,
    category: 'furniture',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    ],
    location: 'Málaga, España',
    seller: {
      name: 'Laura Fernández',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
    createdAt: new Date('2025-09-23'),
    condition: 'good',
  },
];
