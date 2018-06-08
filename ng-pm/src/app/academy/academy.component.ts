import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AcademyService } from './academy.service';
import { Course } from './course.model';

@Component({
  selector: 'bbv-academy',
  templateUrl: './academy.component.html'
})
export class AcademyComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private service: AcademyService) {}

  ngOnInit() {
    this.courses$ = this.service.getAll();
  }
}
