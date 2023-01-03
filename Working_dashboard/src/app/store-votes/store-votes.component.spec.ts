import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreVotesComponent } from './store-votes.component';

describe('StoreVotesComponent', () => {
  let component: StoreVotesComponent;
  let fixture: ComponentFixture<StoreVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreVotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
