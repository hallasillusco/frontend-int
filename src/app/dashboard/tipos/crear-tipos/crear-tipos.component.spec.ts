import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTiposComponent } from './crear-tipos.component';

describe('CrearTiposComponent', () => {
  let component: CrearTiposComponent;
  let fixture: ComponentFixture<CrearTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearTiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
