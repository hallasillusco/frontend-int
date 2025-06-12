import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPrediccionComponent } from './grafico-prediccion.component';

describe('GraficoPrediccionComponent', () => {
  let component: GraficoPrediccionComponent;
  let fixture: ComponentFixture<GraficoPrediccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPrediccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoPrediccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
