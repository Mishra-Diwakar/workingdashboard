import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSalesByFilterComponent } from './store-sales-by-filter.component';

describe('StoreSalesByFilterComponent', () => {
  let component: StoreSalesByFilterComponent;
  let fixture: ComponentFixture<StoreSalesByFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSalesByFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreSalesByFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
