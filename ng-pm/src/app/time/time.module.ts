import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { TimeComponent } from './time.component';
import { TimeDetailComponent } from './time-detail/time-detail.component';
import { NewTimeComponent } from './new-time/new-time.component';

import { TimeService } from './time.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { TimeConverterService } from './timeConverter.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'time', component: TimeComponent, canActivate: [AuthGuardService] },
      { path: 'time/new', component: NewTimeComponent, canActivate: [AuthGuardService] },
      { path: 'time/:id', component: TimeDetailComponent, canActivate: [AuthGuardService] }
    ])
  ],
  declarations: [TimeComponent, TimeDetailComponent, NewTimeComponent],
  providers: [
    TimeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    TimeConverterService
  ]
})
export class TimeModule {}
