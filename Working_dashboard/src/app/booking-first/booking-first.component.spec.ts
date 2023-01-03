import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFirstComponent } from './booking-first.component';

describe('BookingFirstComponent', () => {
  let component: BookingFirstComponent;
  let fixture: ComponentFixture<BookingFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
