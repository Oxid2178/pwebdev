import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { NewTimeComponent } from './new-time.component';
import { TimeService } from '../time.service';

describe('NewTimeComponent', () => {
  const projects = [
    {
      id: 1,
      name: 'Project 1',
      costTypes: [{ id: 1, name: 'Cost Type 1' }, { id: 2, name: 'Cost Type 2' }]
    }
  ];

  const timeService = jasmine.createSpyObj('TimeService', ['getAllProjects']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  const getAllProjectsSpy = timeService.getAllProjects.and.returnValue(of(projects));

  let component: NewTimeComponent;
  let fixture: ComponentFixture<NewTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NewTimeComponent],
      providers: [
        { provide: TimeService, useValue: timeService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
