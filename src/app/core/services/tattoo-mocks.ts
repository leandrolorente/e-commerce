import { Tattoo, TattooStyle, TattooSize } from '../../models/interfaces/tattoo.interface';
import { BodyArea } from '../../models/enums/body-area.enum';

export const MOCK_TATTOOS: Tattoo[] = [
  // Braço Completo
  {
    id: 'tattoo-1',
    name: 'Dragão Oriental Completo',
    description: 'Manga completa com dragão japonês em tons de preto e cinza, com detalhes em vermelho',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800',
      'https://images.unsplash.com/photo-1598816466952-1a31c4997fb2?w=800'
    ],
    bodyArea: BodyArea.BRACO_COMPLETO,
    style: TattooStyle.JAPONES,
    size: TattooSize.EXTRA_GRANDE,
    estimatedTime: '8-12 sessões',
    estimatedPrice: 4500,
    artist: 'Yuki Tanaka',
    difficulty: 'Expert',
    tags: ['dragão', 'oriental', 'manga', 'colorido']
  },
  {
    id: 'tattoo-2',
    name: 'Tribal Maori Braço',
    description: 'Padrões tribais maoris tradicionais em preto sólido',
    images: [
      'https://images.unsplash.com/photo-1565284469096-a83cf8e98eb3?w=800',
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800'
    ],
    bodyArea: BodyArea.BRACO_COMPLETO,
    style: TattooStyle.MAORI,
    size: TattooSize.EXTRA_GRANDE,
    estimatedTime: '6-8 sessões',
    estimatedPrice: 3800,
    artist: 'Tane Williams',
    difficulty: 'Difícil',
    tags: ['tribal', 'maori', 'blackwork', 'tradicional']
  },

  // Antebraço
  {
    id: 'tattoo-3',
    name: 'Leão Realista',
    description: 'Retrato realista de leão em preto e cinza com sombreamento detalhado',
    images: [
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=800',
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800'
    ],
    bodyArea: BodyArea.ANTEBRACO_COMPLETO,
    style: TattooStyle.REALISMO,
    size: TattooSize.GRANDE,
    estimatedTime: '3-4 sessões',
    estimatedPrice: 1800,
    artist: 'Marco Silva',
    difficulty: 'Expert',
    tags: ['leão', 'realismo', 'animal', 'preto e cinza']
  },
  {
    id: 'tattoo-4',
    name: 'Geometria Sagrada',
    description: 'Mandala geométrica com padrões simétricos e linhas finas',
    images: [
      'https://images.unsplash.com/photo-1590246815053-dab0d99563ab?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.ANTEBRACO_EXTERNO,
    style: TattooStyle.GEOMETRICO,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1200,
    artist: 'Ana Costa',
    difficulty: 'Médio',
    tags: ['mandala', 'geométrico', 'simétrico', 'fine line']
  },

  // Peito
  {
    id: 'tattoo-5',
    name: 'Águia Old School',
    description: 'Águia tradicional americana com rosas e fitas',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.PEITO,
    style: TattooStyle.OLD_SCHOOL,
    size: TattooSize.GRANDE,
    estimatedTime: '4-5 sessões',
    estimatedPrice: 2200,
    artist: 'Johnny Flash',
    difficulty: 'Médio',
    tags: ['águia', 'old school', 'tradicional', 'colorido']
  },

  // Costas
  {
    id: 'tattoo-6',
    name: 'Fênix das Cinzas',
    description: 'Fênix renascendo em estilo aquarela com cores vibrantes',
    images: [
      'https://images.unsplash.com/photo-1590246815053-dab0d99563ab?w=800',
      'https://images.unsplash.com/photo-1565284469096-a83cf8e98eb3?w=800'
    ],
    bodyArea: BodyArea.COSTAS_COMPLETAS,
    style: TattooStyle.AQUARELA,
    size: TattooSize.EXTRA_GRANDE,
    estimatedTime: '10-15 sessões',
    estimatedPrice: 5500,
    artist: 'Sofia Martins',
    difficulty: 'Expert',
    tags: ['fênix', 'aquarela', 'colorido', 'grande']
  },

  // Coxa
  {
    id: 'tattoo-7',
    name: 'Flores Japonesas',
    description: 'Peônias e flores de cerejeira em estilo oriental',
    images: [
      'https://images.unsplash.com/photo-1598816466952-1a31c4997fb2?w=800'
    ],
    bodyArea: BodyArea.COXA,
    style: TattooStyle.JAPONES,
    size: TattooSize.GRANDE,
    estimatedTime: '5-6 sessões',
    estimatedPrice: 2800,
    artist: 'Sakura Nakamura',
    difficulty: 'Difícil',
    tags: ['flores', 'japonês', 'colorido', 'peônia']
  },

  // Panturrilha
  {
    id: 'tattoo-8',
    name: 'Lobo Geométrico',
    description: 'Lobo em linhas geométricas com elementos tribais',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.PANTURRILHA,
    style: TattooStyle.GEOMETRICO,
    size: TattooSize.MEDIA,
    estimatedTime: '3 sessões',
    estimatedPrice: 1400,
    artist: 'Pedro Alves',
    difficulty: 'Médio',
    tags: ['lobo', 'geométrico', 'animal', 'preto']
  },

  // Ombro
  {
    id: 'tattoo-9',
    name: 'Samurai Warrior',
    description: 'Guerreiro samurai em estilo japonês tradicional',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.OMBRO,
    style: TattooStyle.JAPONES,
    size: TattooSize.GRANDE,
    estimatedTime: '4-5 sessões',
    estimatedPrice: 2400,
    artist: 'Hiro Yamamoto',
    difficulty: 'Difícil',
    tags: ['samurai', 'japonês', 'guerreiro', 'colorido']
  },

  // Pulso
  {
    id: 'tattoo-10',
    name: 'Minimalista Linha Única',
    description: 'Desenho minimalista de montanhas em linha contínua',
    images: [
      'https://images.unsplash.com/photo-1590246815053-dab0d99563ab?w=800'
    ],
    bodyArea: BodyArea.PULSO,
    style: TattooStyle.MINIMALISTA,
    size: TattooSize.PEQUENA,
    estimatedTime: '1 sessão',
    estimatedPrice: 400,
    artist: 'Carla Santos',
    difficulty: 'Fácil',
    tags: ['minimalista', 'montanha', 'fino', 'simples']
  },

  // Barriga
  {
    id: 'tattoo-11',
    name: 'Mandala Abdominal',
    description: 'Grande mandala com padrões geométricos complexos',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.BARRIGA,
    style: TattooStyle.GEOMETRICO,
    size: TattooSize.EXTRA_GRANDE,
    estimatedTime: '6-8 sessões',
    estimatedPrice: 3200,
    artist: 'Rafael Lima',
    difficulty: 'Expert',
    tags: ['mandala', 'geométrico', 'grande', 'complexo']
  },

  // Pescoço
  {
    id: 'tattoo-12',
    name: 'Rosa Fine Line',
    description: 'Rosa delicada em linhas finas no pescoço',
    images: [
      'https://images.unsplash.com/photo-1598816466952-1a31c4997fb2?w=800'
    ],
    bodyArea: BodyArea.PESCOCO,
    style: TattooStyle.FINE_LINE,
    size: TattooSize.PEQUENA,
    estimatedTime: '1-2 sessões',
    estimatedPrice: 600,
    artist: 'Luna Garcia',
    difficulty: 'Médio',
    tags: ['rosa', 'fine line', 'delicado', 'feminino']
  },

  // Costelas
  {
    id: 'tattoo-13',
    name: 'Frase Inspiradora',
    description: 'Frase em lettering script nas costelas',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.COSTELAS,
    style: TattooStyle.FINE_LINE,
    size: TattooSize.MEDIA,
    estimatedTime: '2 sessões',
    estimatedPrice: 800,
    artist: 'Bruno Ferreira',
    difficulty: 'Médio',
    tags: ['lettering', 'frase', 'script', 'preto']
  },

  // Lombar
  {
    id: 'tattoo-14',
    name: 'Borboletas Aquarela',
    description: 'Borboletas coloridas em estilo aquarela',
    images: [
      'https://images.unsplash.com/photo-1590246815053-dab0d99563ab?w=800'
    ],
    bodyArea: BodyArea.LOMBAR,
    style: TattooStyle.AQUARELA,
    size: TattooSize.MEDIA,
    estimatedTime: '3-4 sessões',
    estimatedPrice: 1600,
    artist: 'Isabella Rocha',
    difficulty: 'Médio',
    tags: ['borboleta', 'aquarela', 'colorido', 'feminino']
  },

  // Tornozelo
  {
    id: 'tattoo-15',
    name: 'Flecha Minimalista',
    description: 'Flecha simples em estilo minimalista',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.TORNOZELO,
    style: TattooStyle.MINIMALISTA,
    size: TattooSize.PEQUENA,
    estimatedTime: '1 sessão',
    estimatedPrice: 350,
    artist: 'Thiago Oliveira',
    difficulty: 'Fácil',
    tags: ['flecha', 'minimalista', 'simples', 'pequeno']
  },

  // Mão
  {
    id: 'tattoo-16',
    name: 'Símbolos Místicos',
    description: 'Símbolos esotéricos nas mãos',
    images: [
      'https://images.unsplash.com/photo-1565284469096-a83cf8e98eb3?w=800'
    ],
    bodyArea: BodyArea.MAO_COMPLETA,
    style: TattooStyle.BLACKWORK,
    size: TattooSize.PEQUENA,
    estimatedTime: '2 sessões',
    estimatedPrice: 700,
    artist: 'Raven Dark',
    difficulty: 'Médio',
    tags: ['símbolos', 'místico', 'blackwork', 'mão']
  },

  // Rosto
  {
    id: 'tattoo-17',
    name: 'Linha Facial Minimalista',
    description: 'Linhas delicadas e minimalistas no rosto',
    images: [
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800'
    ],
    bodyArea: BodyArea.ROSTO,
    style: TattooStyle.MINIMALISTA,
    size: TattooSize.PEQUENA,
    estimatedTime: '1-2 sessões',
    estimatedPrice: 800,
    artist: 'Luna Martinez',
    difficulty: 'Expert',
    tags: ['facial', 'minimalista', 'delicado', 'moderno']
  },

  // Nuca
  {
    id: 'tattoo-18',
    name: 'Mandala Nuca',
    description: 'Mandala detalhada na nuca com padrões geométricos',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800',
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.NUCA,
    style: TattooStyle.GEOMETRICO,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1200,
    artist: 'Amanda Silva',
    difficulty: 'Difícil',
    tags: ['mandala', 'geométrico', 'nuca', 'feminino']
  },

  // Costas Superior
  {
    id: 'tattoo-19',
    name: 'Asas de Anjo',
    description: 'Asas majestosas nas costas superiores em estilo realista',
    images: [
      'https://images.unsplash.com/photo-1565284469096-a83cf8e98eb3?w=800',
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=800',
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800'
    ],
    bodyArea: BodyArea.COSTAS_SUPERIOR,
    style: TattooStyle.REALISMO,
    size: TattooSize.EXTRA_GRANDE,
    estimatedTime: '10-14 sessões',
    estimatedPrice: 5500,
    artist: 'Gabriel Santos',
    difficulty: 'Expert',
    tags: ['asas', 'anjo', 'realista', 'costas']
  },

  // Costas Completas
  {
    id: 'tattoo-20',
    name: 'Dragão Japonês Full Back',
    description: 'Dragão tradicional japonês cobrindo todas as costas',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800',
      'https://images.unsplash.com/photo-1598816466952-1a31c4997fb2?w=800',
      'https://images.unsplash.com/photo-1565284469096-a83cf8e98eb3?w=800'
    ],
    bodyArea: BodyArea.COSTAS_COMPLETAS,
    style: TattooStyle.JAPONES,
    size: TattooSize.EXTRA_GRANDE,
    estimatedTime: '15-20 sessões',
    estimatedPrice: 8000,
    artist: 'Yuki Tanaka',
    difficulty: 'Expert',
    tags: ['dragão', 'japonês', 'full back', 'colorido']
  },

  // Costelas
  {
    id: 'tattoo-21',
    name: 'Flores e Pássaros',
    description: 'Composição delicada de flores e pássaros nas costelas',
    images: [
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.COSTELAS,
    style: TattooStyle.AQUARELA,
    size: TattooSize.GRANDE,
    estimatedTime: '4-6 sessões',
    estimatedPrice: 2800,
    artist: 'Isabella Rocha',
    difficulty: 'Difícil',
    tags: ['flores', 'pássaros', 'aquarela', 'feminino']
  },

  // Abdômen
  {
    id: 'tattoo-22',
    name: 'Geometria Sagrada Abdominal',
    description: 'Padrões geométricos sagrados no abdômen',
    images: [
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=800',
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800'
    ],
    bodyArea: BodyArea.ABDOMEN,
    style: TattooStyle.GEOMETRICO,
    size: TattooSize.GRANDE,
    estimatedTime: '5-7 sessões',
    estimatedPrice: 3200,
    artist: 'Lucas Mendes',
    difficulty: 'Difícil',
    tags: ['geometria', 'sagrado', 'abdômen', 'blackwork']
  },

  // Braço Interno
  {
    id: 'tattoo-23',
    name: 'Flores Delicadas Braço Interno',
    description: 'Rosas em estilo Fine Line no braço interno',
    images: [
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.BRACO_INTERNO,
    style: TattooStyle.FINE_LINE,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1400,
    artist: 'Camila Ferreira',
    difficulty: 'Médio',
    tags: ['flores', 'fine line', 'delicado', 'braço']
  },

  // Braço Externo
  {
    id: 'tattoo-24',
    name: 'Tribal Maori Braço Externo',
    description: 'Padrões tribais maoris no braço externo',
    images: [
      'https://images.unsplash.com/photo-1565284469096-a83cf8e98eb3?w=800',
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.BRACO_EXTERNO,
    style: TattooStyle.MAORI,
    size: TattooSize.GRANDE,
    estimatedTime: '4-5 sessões',
    estimatedPrice: 2500,
    artist: 'Tane Williams',
    difficulty: 'Difícil',
    tags: ['tribal', 'maori', 'blackwork', 'braço']
  },

  // Antebraço Interno
  {
    id: 'tattoo-25',
    name: 'Citação e Flores',
    description: 'Frase motivacional com ornamentos florais no antebraço interno',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.ANTEBRACO_INTERNO,
    style: TattooStyle.FINE_LINE,
    size: TattooSize.MEDIA,
    estimatedTime: '2 sessões',
    estimatedPrice: 1100,
    artist: 'Mariana Costa',
    difficulty: 'Médio',
    tags: ['frase', 'flores', 'fine line', 'feminino']
  },

  // Antebraço Externo
  {
    id: 'tattoo-26',
    name: 'Relógio Old School',
    description: 'Relógio de bolso em estilo old school no antebraço externo',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800',
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=800'
    ],
    bodyArea: BodyArea.ANTEBRACO_EXTERNO,
    style: TattooStyle.OLD_SCHOOL,
    size: TattooSize.MEDIA,
    estimatedTime: '3-4 sessões',
    estimatedPrice: 1800,
    artist: 'Roberto Silva',
    difficulty: 'Médio',
    tags: ['relógio', 'old school', 'tradicional', 'colorido']
  },

  // Cotovelo
  {
    id: 'tattoo-27',
    name: 'Mandala Cotovelo',
    description: 'Mandala geométrica especialmente desenhada para o cotovelo',
    images: [
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800'
    ],
    bodyArea: BodyArea.COTOVELO,
    style: TattooStyle.GEOMETRICO,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1300,
    artist: 'Lucas Mendes',
    difficulty: 'Difícil',
    tags: ['mandala', 'geométrico', 'cotovelo', 'blackwork']
  },

  // Dedos
  {
    id: 'tattoo-28',
    name: 'Anéis e Símbolos nos Dedos',
    description: 'Pequenos símbolos e designs de anéis nos dedos',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.DEDOS,
    style: TattooStyle.MINIMALISTA,
    size: TattooSize.PEQUENA,
    estimatedTime: '1 sessão',
    estimatedPrice: 400,
    artist: 'Thiago Oliveira',
    difficulty: 'Médio',
    tags: ['dedos', 'anéis', 'minimalista', 'símbolos']
  },

  // Coxa Interna
  {
    id: 'tattoo-29',
    name: 'Flores Aquarela Coxa',
    description: 'Composição de flores em estilo aquarela na coxa interna',
    images: [
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.COXA_INTERNA,
    style: TattooStyle.AQUARELA,
    size: TattooSize.GRANDE,
    estimatedTime: '4-5 sessões',
    estimatedPrice: 2600,
    artist: 'Isabella Rocha',
    difficulty: 'Médio',
    tags: ['flores', 'aquarela', 'coxa', 'colorido']
  },

  // Coxa Externa
  {
    id: 'tattoo-30',
    name: 'Tigre Realista Coxa',
    description: 'Retrato realista de tigre na coxa externa',
    images: [
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=800',
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800',
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.COXA_EXTERNA,
    style: TattooStyle.REALISMO,
    size: TattooSize.GRANDE,
    estimatedTime: '6-8 sessões',
    estimatedPrice: 3500,
    artist: 'Rafael Almeida',
    difficulty: 'Expert',
    tags: ['tigre', 'realista', 'coxa', 'animal']
  },

  // Canela
  {
    id: 'tattoo-31',
    name: 'Ornamental Canela',
    description: 'Padrões ornamentais detalhados na canela',
    images: [
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.CANELA,
    style: TattooStyle.ORNAMENTAL,
    size: TattooSize.MEDIA,
    estimatedTime: '3-4 sessões',
    estimatedPrice: 1900,
    artist: 'Amanda Silva',
    difficulty: 'Difícil',
    tags: ['ornamental', 'canela', 'detalhado', 'blackwork']
  },

  // Pé Completo
  {
    id: 'tattoo-32',
    name: 'Flores e Folhagens Pé',
    description: 'Composição de flores e folhagens no pé',
    images: [
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800'
    ],
    bodyArea: BodyArea.PE_COMPLETO,
    style: TattooStyle.FINE_LINE,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1200,
    artist: 'Camila Ferreira',
    difficulty: 'Médio',
    tags: ['flores', 'pé', 'fine line', 'feminino']
  },

  // Dedos do Pé
  {
    id: 'tattoo-33',
    name: 'Símbolos nos Dedos do Pé',
    description: 'Pequenos símbolos minimalistas nos dedos do pé',
    images: [
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.DEDOS_PE,
    style: TattooStyle.MINIMALISTA,
    size: TattooSize.PEQUENA,
    estimatedTime: '1 sessão',
    estimatedPrice: 350,
    artist: 'Thiago Oliveira',
    difficulty: 'Fácil',
    tags: ['dedos', 'pé', 'minimalista', 'símbolos']
  },

  // Ombro Frontal
  {
    id: 'tattoo-34',
    name: 'Rosa Realista Ombro',
    description: 'Rosa em estilo realista no ombro frontal',
    images: [
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=800',
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800'
    ],
    bodyArea: BodyArea.OMBRO_FRONTAL,
    style: TattooStyle.REALISMO,
    size: TattooSize.MEDIA,
    estimatedTime: '3-4 sessões',
    estimatedPrice: 1800,
    artist: 'Rafael Almeida',
    difficulty: 'Difícil',
    tags: ['rosa', 'realista', 'ombro', 'flores']
  },

  // Ombro Traseiro
  {
    id: 'tattoo-35',
    name: 'Tribal Ombro Traseiro',
    description: 'Desenho tribal no ombro traseiro',
    images: [
      'https://images.unsplash.com/photo-1565284469096-a83cf8e98eb3?w=800'
    ],
    bodyArea: BodyArea.OMBRO_TRASEIRO,
    style: TattooStyle.MAORI,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1500,
    artist: 'Tane Williams',
    difficulty: 'Médio',
    tags: ['tribal', 'ombro', 'blackwork', 'maori']
  },

  // Peito Superior
  {
    id: 'tattoo-36',
    name: 'Colar Ornamental',
    description: 'Design ornamental simulando um colar no peito superior',
    images: [
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800'
    ],
    bodyArea: BodyArea.PEITO_SUPERIOR,
    style: TattooStyle.ORNAMENTAL,
    size: TattooSize.MEDIA,
    estimatedTime: '3-4 sessões',
    estimatedPrice: 2000,
    artist: 'Amanda Silva',
    difficulty: 'Difícil',
    tags: ['ornamental', 'peito', 'colar', 'feminino']
  },

  // Peito Lateral
  {
    id: 'tattoo-37',
    name: 'Pássaro Lateral Peito',
    description: 'Pássaro em voo no peito lateral',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.PEITO_LATERAL,
    style: TattooStyle.BLACKWORK,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1600,
    artist: 'Raven Dark',
    difficulty: 'Médio',
    tags: ['pássaro', 'blackwork', 'peito', 'lateral']
  },

  // Perna Completa
  {
    id: 'tattoo-38',
    name: 'Manga Japonesa Perna',
    description: 'Sleeve completa de perna com elementos japoneses',
    images: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800',
      'https://images.unsplash.com/photo-1598816466952-1a31c4997fb2?w=800',
      'https://images.unsplash.com/photo-1590246814883-57c8e7e92e21?w=800'
    ],
    bodyArea: BodyArea.PERNA_COMPLETA,
    style: TattooStyle.JAPONES,
    size: TattooSize.EXTRA_GRANDE,
    estimatedTime: '10-15 sessões',
    estimatedPrice: 6000,
    artist: 'Yuki Tanaka',
    difficulty: 'Expert',
    tags: ['japonês', 'perna', 'sleeve', 'colorido']
  },

  // Joelho
  {
    id: 'tattoo-39',
    name: 'Mandala Joelho',
    description: 'Mandala especialmente adaptada para o joelho',
    images: [
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800'
    ],
    bodyArea: BodyArea.JOELHO,
    style: TattooStyle.GEOMETRICO,
    size: TattooSize.MEDIA,
    estimatedTime: '2-3 sessões',
    estimatedPrice: 1400,
    artist: 'Lucas Mendes',
    difficulty: 'Difícil',
    tags: ['mandala', 'joelho', 'geométrico', 'blackwork']
  },

  // Costas (área geral)
  {
    id: 'tattoo-40',
    name: 'Árvore da Vida',
    description: 'Árvore da vida detalhada nas costas',
    images: [
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=800',
      'https://images.unsplash.com/photo-1598371611061-aa2b8f5c4787?w=800',
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f40d0?w=800'
    ],
    bodyArea: BodyArea.COSTAS,
    style: TattooStyle.BLACKWORK,
    size: TattooSize.GRANDE,
    estimatedTime: '6-8 sessões',
    estimatedPrice: 3800,
    artist: 'Gabriel Santos',
    difficulty: 'Expert',
    tags: ['árvore', 'vida', 'blackwork', 'costas']
  }
];

