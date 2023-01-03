import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizingComponent } from './prizing.component';

describe('PrizingComponent', () => {
  let component: PrizingComponent;
  let fixture: ComponentFixture<PrizingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
