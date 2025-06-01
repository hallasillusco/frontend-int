import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTableauComponent } from './grafico-tableau.component';

describe('GraficoTableauComponent', () => {
  let component: GraficoTableauComponent;
  let fixture: ComponentFixture<GraficoTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoTableauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
