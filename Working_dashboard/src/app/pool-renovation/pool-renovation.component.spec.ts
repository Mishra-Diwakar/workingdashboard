import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolRenovationComponent } from './pool-renovation.component';

describe('PoolRenovationComponent', () => {
  let component: PoolRenovationComponent;
  let fixture: ComponentFixture<PoolRenovationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolRenovationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolRenovationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
