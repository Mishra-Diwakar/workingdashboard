import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolCleaningComponent } from './pool-cleaning.component';

describe('PoolCleaningComponent', () => {
  let component: PoolCleaningComponent;
  let fixture: ComponentFixture<PoolCleaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolCleaningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
