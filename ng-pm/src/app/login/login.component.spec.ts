import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Observable, of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';

describe('LoginComponent', () => {
  const authService = jasmine.createSpyObj('AuthService', ['login']);

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should expose empty failure message', () => {
    fixture.detectChanges();
    expect(component.failureMessage).toBe('');
  });

  it('should have invalid form when no entries were made', () => {
    fixture.detectChanges();
    expect(component.loginForm.valid).toBe(false);
  });

  it('should have valid form when email and password are provided', () => {
    fixture.detectChanges();
    component.loginForm.setValue({
      email: 'john@doe.com',
      password: 'LetMeIn'
    });

    expect(component.loginForm.valid).toBe(true);
  });

  it('should call auth service on submit and expose failure message on failure', () => {
    component.loginForm.setValue({
      email: 'john@doe.com',
      password: 'WrongPassword'
    });

    authService.login.withArgs('john@doe.com', 'WrongPassword').and.returnValue(throwError('401'));

    fixture.detectChanges();
    component.onSubmit();

    expect(component.failureMessage).toBe('Login failed. Please check your email & password.');
  });
});
