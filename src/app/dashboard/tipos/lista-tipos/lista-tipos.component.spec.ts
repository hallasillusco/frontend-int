import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposComponent } from './lista-tipos.component';

describe('ListaTiposComponent', () => {
  let component: ListaTiposComponent;
  let fixture: ComponentFixture<ListaTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
