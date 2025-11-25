import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TattooDetailComponent } from './tattoo-detail.component';

describe('TattooDetailComponent', () => {
  let component: TattooDetailComponent;
  let fixture: ComponentFixture<TattooDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TattooDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TattooDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
