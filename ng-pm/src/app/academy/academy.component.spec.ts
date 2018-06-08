import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { AcademyComponent } from './academy.component';
import { AcademyService } from './academy.service';

describe('AcademyComponent', () => {
  const courses = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const academyService = jasmine.createSpyObj('AcademyService', ['getAll']);
  const getAllSpy = academyService.getAll.and.returnValue(of(courses));

  let component: AcademyComponent;
  let fixture: ComponentFixture<AcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AcademyComponent],
      providers: [{ provide: AcademyService, useValue: academyService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose courses from service', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.courses$.subscribe(c => expect(c.length).toBe(3));
    });
  }));

  it('should display list of courses', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const courseElements = fixture.nativeElement.querySelectorAll('.jumbotron');

      expect(courseElements.length).toBe(3);
      expect(getAllSpy.calls.any()).toBe(true);
    });
  }));
});
