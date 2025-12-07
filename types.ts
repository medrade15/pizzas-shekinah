export type Category = 'Salgadas' | 'Doces' | 'Bebidas';

export interface PriceSize {
  label: string;
  price: number;
  slices: number;
}

export interface Crust {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  basePrice?: number; // For items without sizes like drinks
  isPizza: boolean;
  image: string;
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  secondHalfProduct?: Product;
  selectedSize?: PriceSize;
  selectedCrust?: Crust;
  selectedDrinkFlavor?: string;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  customerName: string;
  address: string;
  locationLink?: string;
  paymentMethod: 'Pix' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro';
  changeFor?: string; // Troco para
  items: CartItem[];
  deliveryFee: number;
  total: number;
}
