import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerficacionPedidoComponent } from './verficacion-pedido.component';

describe('VerficacionPedidoComponent', () => {
  let component: VerficacionPedidoComponent;
  let fixture: ComponentFixture<VerficacionPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerficacionPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerficacionPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
