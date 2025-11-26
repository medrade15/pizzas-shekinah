import { Product, PriceSize, Crust } from './types';

export const PHONE_NUMBER = '5561996125274';
export const DELIVERY_FEE = 5.00;

export const PIZZA_SIZES: PriceSize[] = [
  { label: 'Pequena', slices: 4, price: 45.00 },
  { label: 'Média', slices: 6, price: 55.00 },
  { label: 'Grande', slices: 8, price: 65.00 },
];

export const PIZZA_CRUSTS: Crust[] = [
  { name: 'Sem Borda Recheada', price: 0 },
  { name: 'Catupiry', price: 13.00 },
  { name: 'Cheddar', price: 13.00 },
  { name: 'Chocolate', price: 13.00 },
  { name: 'Chocolate Branco', price: 13.00 },
  { name: 'Doce de Leite', price: 13.00 },
];

// Gera um slug a partir do nome (minúsculo, sem acentos, com hífens)
const toSlug = (name: string): string => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const imagePathFor = (name: string): string => `/images/${toSlug(name)}.jpg`;

const createPizza = (id: string, name: string, description: string, category: 'Salgadas' | 'Doces'): Product => ({
  id,
  name,
  description,
  category,
  isPizza: true,
  image: imagePathFor(name)
});

export const PRODUCTS: Product[] = [
  // Salgadas
  createPizza('1', 'Bacon', 'Mussarela, bacon, champignon e orégano.', 'Salgadas'),
  createPizza('2', 'Bacon Crocante', 'Mussarela, bacon, batata palha e orégano.', 'Salgadas'),
  createPizza('3', 'Baiana', 'Mussarela, calabresa, pimenta calabresa, cebola e orégano.', 'Salgadas'),
  createPizza('4', 'Calabresa', 'Mussarela, calabresa, cebola, azeitona e orégano.', 'Salgadas'),
  createPizza('5', 'Carne Seca', 'Mussarela, carne seca, pimentão, cebola e orégano.', 'Salgadas'),
  createPizza('6', 'Carne Seca com Catupiry', 'Mussarela, carne, catupiry e orégano.', 'Salgadas'),
  createPizza('7', 'Carnechedda', 'Mussarela, carne seca, tomate, cheddar, cebola e orégano.', 'Salgadas'),
  createPizza('8', 'Calacheddar', 'Mussarela, calabresa, cheddar e orégano.', 'Salgadas'),
  createPizza('9', 'Carne Seca c/ Banana', 'Mussarela, carne seca, banana e orégano.', 'Salgadas'),
  createPizza('10', 'Catupiresa', 'Mussarela, calabresa, catupiry, azeitona e orégano.', 'Salgadas'),
  createPizza('11', 'Champignon', 'Mussarela, champignon, pimentão, catupiry e orégano.', 'Salgadas'),
  createPizza('12', 'Cheddar Especial', 'Mussarela, cheddar, champignon, palmito e orégano.', 'Salgadas'),
  createPizza('13', 'Espanhola', 'Mussarela, presunto, tomate, palmito, azeitona e orégano.', 'Salgadas'),
  createPizza('14', 'Frango com Cheddar', 'Mussarela, frango, cheddar, milho e orégano.', 'Salgadas'),
  createPizza('15', 'Francesa', 'Mussarela, presunto, ovo, catupiry e orégano.', 'Salgadas'),
  createPizza('16', 'Frango com Catupiry', 'Mussarela, frango, catupiry e orégano.', 'Salgadas'),
  createPizza('17', 'Goiana', 'Mussarela, frango, milho, palmito, azeitona, catupiry e orégano.', 'Salgadas'),
  createPizza('18', 'Hot Dog', 'Mussarela, salsicha, bacon, batata palha e orégano.', 'Salgadas'),
  createPizza('19', 'Marguerita', 'Mussarela, tomate, alho, azeitona e orégano.', 'Salgadas'),
  createPizza('20', 'Mussarela', 'Mussarela, tomate e orégano.', 'Salgadas'),
  createPizza('21', 'Palmito', 'Mussarela, palmito, alho, bacon e orégano.', 'Salgadas'),
  createPizza('22', 'Portuguesa', 'Mussarela, presunto, ovo, pimentão, cebola e orégano.', 'Salgadas'),
  createPizza('23', 'Presunto', 'Mussarela, presunto, tomate e orégano.', 'Salgadas'),
  createPizza('24', 'Vegetariana', 'Mussarela, tomate, ervilha, palmito, azeitona e orégano.', 'Salgadas'),
  createPizza('25', 'Shekinah', 'Mussarela, calabresa, milho, ovo, cebola, bacon e orégano.', 'Salgadas'),
  createPizza('26', 'Tropical', 'Mussarela, frango, milho, ervilha, ovo, catupiry e orégano.', 'Salgadas'),

  // Doces
  createPizza('27', 'Banana com Chocolate', 'Mussarela, banana, chocolate, canela e confete.', 'Doces'),
  createPizza('28', 'Banana com Canela', 'Mussarela, banana, açúcar e canela.', 'Doces'),
  createPizza('29', 'Doce de Leite', 'Mussarela, doce de leite e paçoca.', 'Doces'),
  createPizza('30', 'Prestígio', 'Mussarela, chocolate e coco ralado.', 'Doces'),
  createPizza('31', 'Pistache', 'Mussarela, ganache de pistache e gotas de chocolate.', 'Doces'),
  createPizza('32', 'Romeu e Julieta', 'Mussarela, goiabada e catupiry.', 'Doces'),
  createPizza('33', 'Brigadeiro', 'Mussarela, chocolate e confete.', 'Doces'),

  // Bebidas
  {
    id: '34',
    name: 'Refrigerante Lata',
    description: '350ml - Diversos sabores',
    category: 'Bebidas',
    isPizza: false,
    basePrice: 7.00,
    image: imagePathFor('Refrigerante Lata')
  },
  {
    id: '35',
    name: 'Refrigerante 2L',
    description: 'Coca-cola, Guaraná, etc.',
    category: 'Bebidas',
    isPizza: false,
    basePrice: 14.00,
    image: imagePathFor('Refrigerante 2L')
  }
];