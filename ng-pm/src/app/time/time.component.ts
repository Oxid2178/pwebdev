import { Component, OnInit } from '@angular/core';

import { Time } from './time.model';
import { TimeService } from './time.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bbv-time',
  templateUrl: './time.component.html'
})
export class TimeComponent implements OnInit {
  times$: Observable<Time[]>;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.times$ = this.timeService.getAllTimes();
  }
}
