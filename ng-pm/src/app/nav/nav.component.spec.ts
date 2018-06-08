import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavComponent } from './nav.component';

import { EventBusService } from '../event-bus.service';
import { AuthService } from '../auth/auth.service';
import { LoginState } from '../auth/login.state';

describe('NavComponent', () => {
  const authService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'userName']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let bus: EventBusService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [
        EventBusService,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService.isLoggedIn.and.returnValue(false);
    authService.userName.and.returnValue('');

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    bus = TestBed.get(EventBusService);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should expose not logged in state', () => {
    fixture.detectChanges();

    expect(component.loginState.userName).toBe('Log in');
  });

  it('should expose logged in state when auth service has token', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.userName.and.returnValue('John Doe');

    fixture.detectChanges();

    expect(component.loginState.userName).toBe('John Doe');
  });

  it('should reflect log in state based on events from bus', () => {
    fixture.detectChanges();
    bus.publish('LoginState', LoginState.LoggedIn('John Doe'));

    expect(component.loginState.userName).toBe('John Doe');
  });

  it('should navigate to login component when not logged id', () => {
    fixture.detectChanges();
    component.navigate();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to logout component when logged id', () => {
    fixture.detectChanges();
    bus.publish('LoginState', LoginState.LoggedIn('John Doe'));
    component.navigate();

    expect(router.navigate).toHaveBeenCalledWith(['/logout']);
  });
});
