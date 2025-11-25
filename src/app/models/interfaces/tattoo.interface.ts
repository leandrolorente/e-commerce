import { BodyArea } from '../enums/body-area.enum';

export interface Tattoo {
  id: string;
  name: string;
  description: string;
  images: string[];
  bodyArea: BodyArea;
  style: TattooStyle;
  size: TattooSize;
  estimatedTime: string;
  estimatedPrice: number;
  artist: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Expert';
  tags: string[];
  colors?: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TattooFilter {
  style?: TattooStyle;
  size?: TattooSize;
  bodyArea?: BodyArea;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  sortBy?: 'price' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateTattooDto {
  name: string;
  description: string;
  style: TattooStyle;
  size: TattooSize;
  bodyArea: BodyArea;
  estimatedTime: string;
  estimatedPrice: number;
  artist: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Expert';
  images: string[];
  tags: string[];
  colors?: string[];
}

export interface UpdateTattooDto extends Partial<CreateTattooDto> {
  isAvailable?: boolean;
}

export enum TattooStyle {
  OLD_SCHOOL = 'Old School',
  REALISMO = 'Realismo',
  BLACKWORK = 'Blackwork',
  AQUARELA = 'Aquarela',
  MAORI = 'Maori',
  JAPONES = 'Japonês',
  GEOMETRICO = 'Geométrico',
  MINIMALISTA = 'Minimalista',
  TRIBAL = 'Tribal',
  FINE_LINE = 'Fine Line',
  PONTILHISMO = 'Pontilhismo',
  ORNAMENTAL = 'Ornamental'
}

export enum TattooSize {
  PEQUENA = 'Pequena (até 5cm)',
  MEDIA = 'Média (5-15cm)',
  GRANDE = 'Grande (15-30cm)',
  EXTRA_GRANDE = 'Extra Grande (30cm+)'
}
