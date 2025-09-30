export type Category = 
  | 'electronics'
  | 'furniture'
  | 'clothing'
  | 'vehicles'
  | 'sports'
  | 'books'
  | 'home'
  | 'toys'
  | 'other';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  location: string;
  seller: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
}
