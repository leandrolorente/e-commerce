import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BodyArea } from '@models/enums/body-area.enum';
import { CommonModule } from '@angular/common';

interface BodyAreaCategory {
  name: string;
  areas: { label: string; value: BodyArea }[];
}

@Component({
  selector: 'app-body-map',
  imports: [CommonModule],
  templateUrl: './body-map.component.html',
  styleUrl: './body-map.component.scss'
})
export class BodyMapComponent {
  hoveredArea = signal<string | null>(null);
  BodyArea = BodyArea; // Expor enum para o template

  categories: BodyAreaCategory[] = [
    {
      name: 'Cabeça e Pescoço',
      areas: [
        { label: 'Rosto', value: BodyArea.ROSTO },
        { label: 'Pescoço', value: BodyArea.PESCOCO },
        { label: 'Nuca', value: BodyArea.NUCA }
      ]
    },
    {
      name: 'Tronco',
      areas: [
        { label: 'Peito', value: BodyArea.PEITO },
        { label: 'Costelas', value: BodyArea.COSTELAS },
        { label: 'Barriga', value: BodyArea.BARRIGA },
        { label: 'Costas', value: BodyArea.COSTAS },
        { label: 'Lombar', value: BodyArea.LOMBAR }
      ]
    },
    {
      name: 'Braços',
      areas: [
        { label: 'Braço Completo', value: BodyArea.BRACO_COMPLETO },
        { label: 'Braço Superior', value: BodyArea.BRACO_SUPERIOR },
        { label: 'Braço Interno', value: BodyArea.BRACO_INTERNO },
        { label: 'Braço Externo', value: BodyArea.BRACO_EXTERNO },
        { label: 'Antebraço Completo', value: BodyArea.ANTEBRACO_COMPLETO },
        { label: 'Antebraço Interno', value: BodyArea.ANTEBRACO_INTERNO },
        { label: 'Antebraço Externo', value: BodyArea.ANTEBRACO_EXTERNO },
        { label: 'Cotovelo', value: BodyArea.COTOVELO },
        { label: 'Ombro', value: BodyArea.OMBRO },
        { label: 'Ombro Frontal', value: BodyArea.OMBRO_FRONTAL },
        { label: 'Ombro Traseiro', value: BodyArea.OMBRO_TRASEIRO }
      ]
    },
    {
      name: 'Mãos',
      areas: [
        { label: 'Mão Completa', value: BodyArea.MAO_COMPLETA },
        { label: 'Dedos', value: BodyArea.DEDOS },
        { label: 'Pulso', value: BodyArea.PULSO }
      ]
    },
    {
      name: 'Pernas',
      areas: [
        { label: 'Perna Completa', value: BodyArea.PERNA_COMPLETA },
        { label: 'Coxa', value: BodyArea.COXA },
        { label: 'Coxa Interna', value: BodyArea.COXA_INTERNA },
        { label: 'Coxa Externa', value: BodyArea.COXA_EXTERNA },
        { label: 'Joelho', value: BodyArea.JOELHO },
        { label: 'Panturrilha', value: BodyArea.PANTURRILHA },
        { label: 'Canela', value: BodyArea.CANELA }
      ]
    },
    {
      name: 'Pés',
      areas: [
        { label: 'Pé Completo', value: BodyArea.PE_COMPLETO },
        { label: 'Tornozelo', value: BodyArea.TORNOZELO },
        { label: 'Dedos do Pé', value: BodyArea.DEDOS_PE }
      ]
    }
  ];

  constructor(private router: Router) {}

  selectArea(area: BodyArea): void {
    this.router.navigate(['/tattoos'], { queryParams: { area } });
  }

  onAreaHover(areaName: string): void {
    this.hoveredArea.set(areaName);
  }

  onAreaLeave(): void {
    this.hoveredArea.set(null);
  }
}
