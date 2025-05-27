import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoClienteComponent } from './listar-tipo-cliente.component';

describe('ListarTipoClienteComponent', () => {
  let component: ListarTipoClienteComponent;
  let fixture: ComponentFixture<ListarTipoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTipoClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarTipoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
