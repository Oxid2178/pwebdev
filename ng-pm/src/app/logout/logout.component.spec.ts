import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LogoutComponent } from './logout.component';
import { AuthService } from '../auth/auth.service';

describe('LogoutComponent', () => {
  const authService = jasmine.createSpyObj('AuthService', ['logout']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout with service', () => {
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should navigate to home component', () => {
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
