import { Product, ProductCategory, Review } from '@models';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pomada Cicatrizante Premium',
    description: 'Pomada especializada para cicatrização de tatuagens, com ingredientes naturais',
    price: 45.90,
    discountPrice: 39.90,
    category: ProductCategory.CUIDADOS,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'
    ],
    stock: 50,
    rating: 4.8,
    reviewCount: 124,
    specifications: {
      'Tipo': 'Pomada Cicatrizante',
      'Volume': '50g',
      'Ingredientes': '100% Natural',
      'Uso': 'Pós-tatuagem'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-20')
  },
  {
    id: '2',
    name: 'Protetor Solar FPS 50',
    description: 'Proteção solar especial para tatuagens, previne desbotamento das cores',
    price: 59.90,
    discountPrice: 49.90,
    category: ProductCategory.CUIDADOS,
    images: [
      'https://images.unsplash.com/photo-1556228994-230e0b356b06?w=400',
      'https://images.unsplash.com/photo-1556229174-5e42a09e9a45?w=400'
    ],
    stock: 30,
    rating: 4.9,
    reviewCount: 89,
    specifications: {
      'FPS': '50',
      'Volume': '100ml',
      'Tipo': 'Especial para tatuagens',
      'Resistência': 'Água e suor'
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-11-22')
  },
  {
    id: '3',
    name: 'Sabonete Antibacteriano Tattoo',
    description: 'Sabonete especial para limpeza de tatuagens, pH neutro e antibacteriano',
    price: 29.90,
    discountPrice: 24.90,
    category: ProductCategory.CUIDADOS,
    images: [
      'https://images.unsplash.com/photo-1588016522275-5f2e3a72e506?w=400',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
    ],
    stock: 75,
    rating: 4.7,
    reviewCount: 156,
    specifications: {
      'Tipo': 'Antibacteriano',
      'pH': 'Neutro',
      'Volume': '150ml',
      'Fragrância': 'Suave'
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-11-18')
  },
  {
    id: '4',
    name: 'Camiseta Guarana Tatto - Preta',
    description: 'Camiseta 100% algodão com logo do estúdio, confortável e estilosa',
    price: 79.90,
    category: ProductCategory.VESTUARIO,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400'
    ],
    stock: 25,
    rating: 4.9,
    reviewCount: 67,
    specifications: {
      'Material': '100% Algodão',
      'Cores': 'Preta',
      'Tamanhos': 'P, M, G, GG',
      'Estampa': 'Logo Guarana Tatto'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-11-15')
  },
  {
    id: '5',
    name: 'Boné Guarana Tatto - Snapback',
    description: 'Boné snapback com logo bordado, estilo streetwear',
    price: 69.90,
    discountPrice: 59.90,
    category: ProductCategory.ACESSORIOS,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400'
    ],
    stock: 40,
    rating: 4.6,
    reviewCount: 92,
    specifications: {
      'Tipo': 'Snapback',
      'Material': 'Algodão',
      'Ajuste': 'Regulável',
      'Logo': 'Bordado'
    },
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-11-21')
  },
  {
    id: '6',
    name: 'Kit Cuidados Completo',
    description: 'Kit com pomada, sabonete e protetor solar para cuidados completos',
    price: 129.90,
    discountPrice: 99.90,
    category: ProductCategory.CUIDADOS,
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'
    ],
    stock: 35,
    rating: 4.9,
    reviewCount: 203,
    specifications: {
      'Itens': '3 produtos',
      'Conteúdo': 'Pomada + Sabonete + Protetor',
      'Economia': '23% de desconto',
      'Indicado': 'Tatuagens novas'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-11-19')
  },
  {
    id: '7',
    name: 'Chaveiro Guarana Tatto - Metal',
    description: 'Chaveiro de metal com logo do estúdio, acabamento premium',
    price: 19.90,
    discountPrice: 14.90,
    category: ProductCategory.ACESSORIOS,
    images: [
      'https://images.unsplash.com/photo-1582561833237-bb1a9a628a3a?w=400'
    ],
    stock: 150,
    rating: 4.7,
    reviewCount: 78,
    specifications: {
      'Material': 'Metal cromado',
      'Tamanho': '5cm',
      'Logo': 'Gravado',
      'Acabamento': 'Premium'
    },
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-11-20')
  },
  {
    id: '8',
    name: 'Luvas Descartáveis - Caixa 100un',
    description: 'Luvas de nitrilo para tatuagem, sem pó, hipoalergênicas',
    price: 89.90,
    discountPrice: 79.90,
    category: ProductCategory.EQUIPAMENTOS,
    images: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400'
    ],
    stock: 60,
    rating: 4.8,
    reviewCount: 145,
    specifications: {
      'Material': 'Nitrilo',
      'Quantidade': '100 unidades',
      'Tamanhos': 'P, M, G',
      'Tipo': 'Sem pó'
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
