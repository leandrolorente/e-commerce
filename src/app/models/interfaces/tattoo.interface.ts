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
  OLD_SCHOOL = 'OLD_SCHOOL',
  REALISMO = 'REALISMO',
  BLACKWORK = 'BLACKWORK',
  AQUARELA = 'AQUARELA',
  MAORI = 'MAORI',
  JAPONES = 'JAPONES',
  GEOMETRICO = 'GEOMETRICO',
  MINIMALISTA = 'MINIMALISTA',
  TRIBAL = 'TRIBAL',
  FINE_LINE = 'FINE_LINE',
  PONTILHISMO = 'PONTILHISMO',
  ORNAMENTAL = 'ORNAMENTAL'
}

export enum TattooSize {
  PEQUENA = 'PEQUENA',
  MEDIA = 'MEDIA',
  GRANDE = 'GRANDE',
  EXTRA_GRANDE = 'EXTRA_GRANDE'
}
