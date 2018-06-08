import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { StatisticsComponent } from './statistics.component';
import { StatisticsByDateComponent } from './statistics-by-date/statistics-by-date.component';
import { StatisticsByProjectComponent } from './statistics-by-project/statistics-by-project.component';
import { WorktimeDirective } from './worktime.directive';

import { StatisticsService } from './statistics.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuardService] }
    ])
  ],
  declarations: [
    StatisticsComponent,
    StatisticsByDateComponent,
    StatisticsByProjectComponent,
    WorktimeDirective
  ],
  providers: [
    StatisticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class StatisticsModule {}
