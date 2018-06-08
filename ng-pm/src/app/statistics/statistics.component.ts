import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { StatisticsService } from './statistics.service';
import { TimeByProject, TimeByDate } from './statistics.model';

@Component({
  selector: 'bbv-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit, OnDestroy {
  totalTime = 0;
  timesByDate: TimeByDate[] = [];
  timesByProject: TimeByProject[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private statisticsServie: StatisticsService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.statisticsServie.getAllByDate().subscribe(d => {
        this.totalTime += d.amount;
        this.timesByDate.push(d);
      })
    );

    this.subscriptions.push(
      this.statisticsServie.getAllByProject().subscribe(p => {
        this.timesByProject.push(p);
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }
}
