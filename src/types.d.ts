export type MenuCategory = 'dish' | 'dessert' | 'drink';

export interface Menu {
  id: string;
  name: string;
  price: number;
  alt: string;
  image: string;
  category: MenuCategory;
  rating: number;
}
