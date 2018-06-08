import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { StatisticsComponent } from './statistics.component';
import { StatisticsByDateComponent } from './statistics-by-date/statistics-by-date.component';
import { StatisticsByProjectComponent } from './statistics-by-project/statistics-by-project.component';

import { WorktimeDirective } from './worktime.directive';
import { DurationPipe } from '../shared/duration.pipe';
import { StatisticsService } from './statistics.service';

describe('StatisticsComponent', () => {
  const amountPerDate = { date: '2018-06-01T00:00', amount: 42 };
  const amountPerProject = { project: 'Project 1', amount: 42 };

  const statisticsService = jasmine.createSpyObj('StatisticsService', [
    'getAllByDate',
    'getAllByProject'
  ]);
  const getAllByDateSpy = statisticsService.getAllByDate.and.returnValue(of(amountPerDate));
  const getAllByProjectSpy = statisticsService.getAllByProject.and.returnValue(
    of(amountPerProject)
  );

  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsComponent,
        StatisticsByDateComponent,
        StatisticsByProjectComponent,
        WorktimeDirective,
        DurationPipe
      ],
      providers: [{ provide: StatisticsService, useValue: statisticsService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
