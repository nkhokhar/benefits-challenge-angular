import { Component } from '@angular/core';
import { ReviewInfoComponent } from '../review/review-info.component';
import { CommonModule } from '@angular/common';
import { BenefitElectionComponent } from '../benefit-election/benefit-election.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss'],
  imports: [
    ReviewInfoComponent,
    CommonModule,
    BenefitElectionComponent,
    MatButtonModule,
  ],
})
export class EnrollmentComponent {
  steps = ['review', 'election'];
  currentStep = 0;
  submitted = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedStep = localStorage.getItem('currentStep');
    const submitted = localStorage.getItem('submitted');

    if (submitted) {
      this.submitted = true;
    }

    if (savedStep) {
      this.currentStep = JSON.parse(savedStep);
    }
  }

  nextStep(submit?: boolean) {
    if (submit) {
      this.submitted = true;
      localStorage.setItem('submitted', JSON.stringify(true));
      return;
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep += 1;
      localStorage.setItem('currentStep', JSON.stringify(this.currentStep));
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
      localStorage.setItem('currentStep', JSON.stringify(this.currentStep));
    }
  }

  startEnrollment() {
    localStorage.clear();
    window.location.reload();
  }
}
