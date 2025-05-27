import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBlogsComponent } from './crear-blogs.component';

describe('CrearBlogsComponent', () => {
  let component: CrearBlogsComponent;
  let fixture: ComponentFixture<CrearBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearBlogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
