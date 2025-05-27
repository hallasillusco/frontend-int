import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUnidadComponent } from './lista-unidad.component';

describe('ListaUnidadComponent', () => {
  let component: ListaUnidadComponent;
  let fixture: ComponentFixture<ListaUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUnidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
