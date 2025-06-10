import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoComparativaComponent } from './grafico-comparativa.component';

describe('GraficoComparativaComponent', () => {
  let component: GraficoComparativaComponent;
  let fixture: ComponentFixture<GraficoComparativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoComparativaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoComparativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
