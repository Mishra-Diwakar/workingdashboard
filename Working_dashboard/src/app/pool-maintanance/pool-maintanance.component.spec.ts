import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolMaintananceComponent } from './pool-maintanance.component';

describe('PoolMaintananceComponent', () => {
  let component: PoolMaintananceComponent;
  let fixture: ComponentFixture<PoolMaintananceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolMaintananceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolMaintananceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
