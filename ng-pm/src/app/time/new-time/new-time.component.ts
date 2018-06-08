import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { TimeService } from '../time.service';
import { Project, CostType } from '../project.model';

@Component({
  selector: 'bbv-new-time',
  templateUrl: './new-time.component.html'
})
export class NewTimeComponent implements OnInit, OnDestroy {
  timeForm: FormGroup;
  projects: Project[];
  costTypes: CostType[];

  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private router: Router
  ) {
    this.timeForm = this.formBuilder.group({
      date: new FormControl(''),
      project: new FormControl(''),
      costType: new FormControl(''),
      amount: new FormControl(0, Validators.required),
      comment: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.subscription = this.timeService.getAllProjects().subscribe(p => {
      this.projects = p;
      this.onSelect(p[0].name);

      this.timeForm.patchValue({
        date: this.currentDate(),
        project: this.projects[0].name,
        costType: this.costTypes[0].name
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSelect(name: string) {
    this.costTypes = this.projects.find(p => p.name === name).costTypes;
  }

  onSubmit() {
    this.timeService
      .saveTime(
        this.timeForm.value.date,
        this.timeForm.value.project,
        this.timeForm.value.costType,
        this.timeForm.value.amount,
        this.timeForm.value.comment
      )
      .subscribe(() => {
        this.router.navigate(['/time']);
      });
  }

  private currentDate() {
    const datePipe = new DatePipe(navigator.language);
    const format = 'yyyy-MM-dd';

    return datePipe.transform(new Date(), format);
  }
}
