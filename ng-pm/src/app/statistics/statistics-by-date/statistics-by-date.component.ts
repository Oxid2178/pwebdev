import { Component, Input } from '@angular/core';

import { TimeByDate } from '../statistics.model';

@Component({
  selector: 'bbv-statistics-by-date',
  templateUrl: './statistics-by-date.component.html'
})
export class StatisticsByDateComponent {
  @Input() timesByDate: TimeByDate[];
  @Input() totalTime: number;
}
