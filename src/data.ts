import { Product } from './types';

export const products: Product[] = [
  {
    id: 'un_parka_01',
    title: 'Unclothes Apex Parka',
    description: 'A minimalist tactical luxury techwear parka designed with architectural precision. Waterproof modular membranes, breathable under-arm vents, and adjustable hardware make it the ultimate futuristic protective outer layer.',
    priceTON: 2.4,
    discountPriceTON: 1.2,
    image: '/src/assets/images/unclothes_parka_1781576301427.jpg',
    category: 'Outerwear',
    rating: 4.9,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Core Black', hex: '#0A0A0A' },
      { name: 'Stealth Grey', hex: '#2A2E35' },
      { name: 'Muted Khaki', hex: '#4A4E40' }
    ]
  },
  {
    id: 'un_tshirt_02',
    title: 'Cyberpunk Oversized Tee',
    description: 'An oversized heavy-cotton boxy cyber tee featuring high-density tactile silicone branding on the chest, drop shoulders, and reinforced side seams for maximum structural integrity.',
    priceTON: 0.8,
    discountPriceTON: 0.4,
    image: '/src/assets/images/unclothes_tshirt_1781576316485.jpg',
    category: 'Tops',
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Core Black', hex: '#0A0A0A' },
      { name: 'Ashes White', hex: '#E5E5E5' }
    ]
  },
  {
    id: 'un_cargo_03',
    title: 'Vortex Cargo Pants',
    description: 'Sleek asymmetric multi-pocket techwear trousers. Built with high-performance light water-resistant stretch fabrics, featuring 6 ergonomic utility pockets and customizable ankle-cuff drawcuffs.',
    priceTON: 1.6,
    discountPriceTON: 0.8,
    image: '/src/assets/images/unclothes_cargo_1781576333945.jpg',
    category: 'Pants',
    rating: 4.7,
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Stealth Grey', hex: '#1C1F22' },
      { name: 'Core Black', hex: '#060606' }
    ]
  },
  {
    id: 'un_hoodie_04',
    title: 'Solitude Knitwear Hoodie',
    description: 'A luxury heavy-knit organic off-white designer hoodie with geometric patterns. Handcrafted detailing on structural ribbing, extreme thermal comfort, and soft premium drapery.',
    priceTON: 1.4,
    discountPriceTON: 0.7,
    image: '/src/assets/images/unclothes_hoodie_1781576349168.jpg',
    category: 'Sweaters',
    rating: 4.9,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Parchment White', hex: '#F4F1EA' },
      { name: 'Asphalt Charcoal', hex: '#3E3E3E' }
    ]
  }
];
