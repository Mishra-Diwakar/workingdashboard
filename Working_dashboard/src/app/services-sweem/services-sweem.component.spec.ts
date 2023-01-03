import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSweemComponent } from './services-sweem.component';

describe('ServicesSweemComponent', () => {
  let component: ServicesSweemComponent;
  let fixture: ComponentFixture<ServicesSweemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesSweemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesSweemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
