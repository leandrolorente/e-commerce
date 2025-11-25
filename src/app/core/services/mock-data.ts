import { Product, ProductCategory, Review } from '@models';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Notebook Gamer RGB',
    description: 'Notebook potente para jogos e trabalho com iluminação RGB customizável',
    price: 5499.99,
    discountPrice: 4799.99,
    category: ProductCategory.ELECTRONICS,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 342,
    specifications: {
      'Processador': 'Intel Core i7 12th Gen',
      'Memória RAM': '16GB DDR5',
      'Armazenamento': '512GB SSD',
      'Placa de Vídeo': 'RTX 4060 8GB'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-20')
  },
  {
    id: '2',
    name: 'Smartphone Pro Max',
    description: 'Último modelo com câmera tripla de 108MP e processador de última geração',
    price: 3999.99,
    discountPrice: 3499.99,
    category: ProductCategory.ELECTRONICS,
    images: [
      'https://images.unsplash.com/photo-1592286927505-40f2f8c6c8f7?w=400',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400'
    ],
    stock: 28,
    rating: 4.9,
    reviewCount: 856,
    specifications: {
      'Tela': '6.7" AMOLED 120Hz',
      'Câmera': '108MP + 12MP + 12MP',
      'Bateria': '5000mAh',
      'Armazenamento': '256GB'
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-11-22')
  },
  {
    id: '3',
    name: 'Fone de Ouvido Bluetooth Premium',
    description: 'Cancelamento de ruído ativo, autonomia de 30h, conforto excepcional',
    price: 899.99,
    discountPrice: 699.99,
    category: ProductCategory.ELECTRONICS,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400'
    ],
    stock: 45,
    rating: 4.7,
    reviewCount: 523,
    specifications: {
      'Conectividade': 'Bluetooth 5.3',
      'Bateria': '30 horas',
      'ANC': 'Sim',
      'Drivers': '40mm'
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-11-18')
  },
  {
    id: '4',
    name: 'Smart TV 55" 4K OLED',
    description: 'Tecnologia OLED com cores vibrantes, HDR10+, sistema operacional inteligente',
    price: 4299.99,
    category: ProductCategory.ELECTRONICS,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400',
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'
    ],
    stock: 8,
    rating: 4.9,
    reviewCount: 287,
    specifications: {
      'Tamanho': '55 polegadas',
      'Resolução': '4K OLED',
      'HDR': 'HDR10+',
      'Smart': 'Android TV'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-11-15')
  },
  {
    id: '5',
    name: 'Tênis Esportivo Performance',
    description: 'Tecnologia de amortecimento avançada, ideal para corrida e treinos',
    price: 599.99,
    discountPrice: 449.99,
    category: ProductCategory.SPORTS,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400'
    ],
    stock: 67,
    rating: 4.6,
    reviewCount: 1024,
    specifications: {
      'Tipo': 'Running',
      'Amortecimento': 'Air Cushion',
      'Material': 'Mesh respirável',
      'Numeração': '36-44'
    },
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-11-21')
  },
  {
    id: '6',
    name: 'Livro: Código Limpo',
    description: 'Guia completo de boas práticas em programação por Robert C. Martin',
    price: 89.99,
    discountPrice: 69.99,
    category: ProductCategory.BOOKS,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'
    ],
    stock: 125,
    rating: 4.9,
    reviewCount: 2341,
    specifications: {
      'Autor': 'Robert C. Martin',
      'Páginas': '464',
      'Idioma': 'Português',
      'Editora': 'Alta Books'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-11-19')
  },
  {
    id: '7',
    name: 'Mouse Gamer RGB 16000 DPI',
    description: 'Sensor óptico de alta precisão, 8 botões programáveis, iluminação RGB',
    price: 249.99,
    discountPrice: 189.99,
    category: ProductCategory.ELECTRONICS,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400'
    ],
    stock: 92,
    rating: 4.7,
    reviewCount: 634,
    specifications: {
      'DPI': '16000',
      'Botões': '8 programáveis',
      'RGB': 'Sim',
      'Conexão': 'USB'
    },
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-11-20')
  },
  {
    id: '8',
    name: 'Cafeteira Expresso Automática',
    description: 'Prepara café expresso perfeito com moedor integrado e espumador de leite',
    price: 1899.99,
    discountPrice: 1599.99,
    category: ProductCategory.HOME,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400'
    ],
    stock: 23,
    rating: 4.8,
    reviewCount: 412,
    specifications: {
      'Tipo': 'Expresso',
      'Moedor': 'Integrado',
      'Pressão': '19 bar',
      'Capacidade': '1.8L'
    },
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-11-17')
  }
];

export const MOCK_FEATURED_PRODUCTS = MOCK_PRODUCTS.filter(p => p.discountPrice).slice(0, 4);

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    userName: 'Carlos Silva',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    title: 'Excelente notebook!',
    comment: 'Comprei para trabalho e gaming. Desempenho impecável, a iluminação RGB é linda e roda todos os jogos em qualidade máxima. Vale muito a pena!',
    helpful: 45,
    createdAt: new Date('2024-11-10')
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'u2',
    userName: 'Ana Paula',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    title: 'Muito bom, mas esquenta um pouco',
    comment: 'O notebook é ótimo, performance excelente. Único ponto negativo é que esquenta nas sessões mais longas de jogo. Recomendo usar base com cooler.',
    helpful: 28,
    createdAt: new Date('2024-11-08')
  },
  {
    id: 'r3',
    productId: '2',
    userId: 'u3',
    userName: 'Roberto Santos',
    userAvatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    title: 'Melhor smartphone que já tive!',
    comment: 'Câmera sensacional, bateria dura o dia todo mesmo com uso intenso. A tela de 120Hz faz toda diferença. Recomendo demais!',
    helpful: 92,
    createdAt: new Date('2024-11-15')
  },
  {
    id: 'r4',
    productId: '3',
    userId: 'u4',
    userName: 'Mariana Costa',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    title: 'Cancelamento de ruído perfeito',
    comment: 'Uso diariamente para trabalho remoto. O ANC é excelente, consigo focar completamente. Som de alta qualidade e super confortável.',
    helpful: 67,
    createdAt: new Date('2024-11-12')
  },
  {
    id: 'r5',
    productId: '3',
    userId: 'u5',
    userName: 'Pedro Oliveira',
    userAvatar: 'https://i.pravatar.cc/150?img=13',
    rating: 4,
    title: 'Ótimo custo-benefício',
    comment: 'Pelo preço com desconto, vale muito a pena. Som balanceado, bateria dura bastante. Poderia ter mais graves, mas no geral estou satisfeito.',
    helpful: 34,
    createdAt: new Date('2024-11-05')
  },
  {
    id: 'r6',
    productId: '5',
    userId: 'u6',
    userName: 'Juliana Ferreira',
    userAvatar: 'https://i.pravatar.cc/150?img=10',
    rating: 5,
    title: 'Perfeito para corrida!',
    comment: 'Uso para treinos de corrida há 3 meses. Amortecimento excelente, proteção para as articulações. Muito confortável mesmo em corridas longas.',
    helpful: 156,
    createdAt: new Date('2024-10-20')
  },
  {
    id: 'r7',
    productId: '6',
    userId: 'u7',
    userName: 'Lucas Mendes',
    userAvatar: 'https://i.pravatar.cc/150?img=14',
    rating: 5,
    title: 'Leitura obrigatória para desenvolvedores',
    comment: 'Mudou completamente minha forma de programar. Conceitos claros e exemplos práticos. Todo dev deveria ler!',
    helpful: 234,
    createdAt: new Date('2024-09-15')
  },
  {
    id: 'r8',
    productId: '7',
    userId: 'u8',
    userName: 'Felipe Almeida',
    userAvatar: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    title: 'Mouse gamer top!',
    comment: 'Precisão incrível, RGB personalizável, botões programáveis são muito úteis. Melhorou muito minha performance nos jogos.',
    helpful: 78,
    createdAt: new Date('2024-11-01')
  },
  {
    id: 'r9',
    productId: '8',
    userId: 'u9',
    userName: 'Beatriz Lima',
    userAvatar: 'https://i.pravatar.cc/150?img=16',
    rating: 5,
    title: 'Café de cafeteria em casa!',
    comment: 'Faz café expresso profissional. O moedor integrado garante frescor. Espumador funciona perfeitamente. Vale cada centavo!',
    helpful: 89,
    createdAt: new Date('2024-10-28')
  }
];
