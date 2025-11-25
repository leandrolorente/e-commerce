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
