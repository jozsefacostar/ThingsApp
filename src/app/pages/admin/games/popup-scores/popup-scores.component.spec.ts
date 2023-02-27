import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupScoresComponent } from './popup-scores.component';

describe('PopupScoresComponent', () => {
  let component: PopupScoresComponent;
  let fixture: ComponentFixture<PopupScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
