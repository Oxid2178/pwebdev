import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { AcademyDetailComponent } from './academy-detail.component';
import { AcademyService } from '../academy.service';

describe('AcademyDetailComponent', () => {
  const course = { id: 1, title: 'Course Title' };

  const academyService = jasmine.createSpyObj('AcademyService', ['getCourse']);
  const getCourseSpy = academyService.getCourse.and.returnValue(of(course));

  let component: AcademyDetailComponent;
  let fixture: ComponentFixture<AcademyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AcademyDetailComponent],
      providers: [{ provide: AcademyService, useValue: academyService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose course from service', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.course$.subscribe(c => expect(c.title).toBe('Course Title'));
    });
  }));

  it('should display course', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const courseElement = fixture.nativeElement.querySelector('h2');

      expect(courseElement.textContent).toBe('Course Title');
      expect(getCourseSpy.calls.any()).toBe(true);
    });
  }));
});
