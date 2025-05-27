import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSubcategoriaComponent } from './crear-subcategoria.component';

describe('CrearSubcategoriaComponent', () => {
  let component: CrearSubcategoriaComponent;
  let fixture: ComponentFixture<CrearSubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearSubcategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
