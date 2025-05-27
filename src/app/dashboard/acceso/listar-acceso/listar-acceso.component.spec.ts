import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAccesoComponent } from './listar-acceso.component';

describe('ListarAccesoComponent', () => {
  let component: ListarAccesoComponent;
  let fixture: ComponentFixture<ListarAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAccesoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
