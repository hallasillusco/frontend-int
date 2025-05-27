import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTiposComponent } from './menu-tipos.component';

describe('MenuTiposComponent', () => {
  let component: MenuTiposComponent;
  let fixture: ComponentFixture<MenuTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuTiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

