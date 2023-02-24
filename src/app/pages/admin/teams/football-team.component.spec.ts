import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballTeamComponent } from './football-team.component';

describe('FootballTeamComponent', () => {
  let component: FootballTeamComponent;
  let fixture: ComponentFixture<FootballTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
