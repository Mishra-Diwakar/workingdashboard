import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstfooterComponent } from './firstfooter.component';

describe('FirstfooterComponent', () => {
  let component: FirstfooterComponent;
  let fixture: ComponentFixture<FirstfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstfooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
