import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProformasComponent } from './crear-proformas.component';

describe('CrearProformasComponent', () => {
  let component: CrearProformasComponent;
  let fixture: ComponentFixture<CrearProformasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearProformasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearProformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
