import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EnrollmentComponent } from './modules/benefits/components/enrollment/enrollment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'benefits',
    pathMatch: 'full',
  },
  {
    path: 'benefits',
    component: EnrollmentComponent,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AppModule {}
