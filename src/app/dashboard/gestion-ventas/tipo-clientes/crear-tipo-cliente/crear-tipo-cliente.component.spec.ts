import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoClienteComponent } from './crear-tipo-cliente.component';

describe('CrearTipoClienteComponent', () => {
  let component: CrearTipoClienteComponent;
  let fixture: ComponentFixture<CrearTipoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTipoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
