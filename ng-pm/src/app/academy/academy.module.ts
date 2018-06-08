import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AcademyComponent } from './academy.component';
import { AcademyDetailComponent } from './academy-detail/academy-detail.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'academy', component: AcademyComponent },
      { path: 'academy/:id', component: AcademyDetailComponent }
    ])
  ],
  declarations: [AcademyComponent, AcademyDetailComponent]
})
export class AcademyModule {}
