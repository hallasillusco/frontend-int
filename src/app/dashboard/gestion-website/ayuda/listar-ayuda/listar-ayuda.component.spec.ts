import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAyudaComponent } from './listar-ayuda.component';

describe('ListarAyudaComponent', () => {
  let component: ListarAyudaComponent;
  let fixture: ComponentFixture<ListarAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarAyudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
