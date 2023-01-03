import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstheaderComponent } from './firstheader.component';

describe('FirstheaderComponent', () => {
  let component: FirstheaderComponent;
  let fixture: ComponentFixture<FirstheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
