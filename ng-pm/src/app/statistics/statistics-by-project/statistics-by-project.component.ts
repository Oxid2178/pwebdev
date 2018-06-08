import { Component, Input } from '@angular/core';

import { TimeByProject } from '../statistics.model';

@Component({
  selector: 'bbv-statistics-by-project',
  templateUrl: './statistics-by-project.component.html'
})
export class StatisticsByProjectComponent {
  @Input() timesByProject: TimeByProject[];
  @Input() totalTime: number;
}
