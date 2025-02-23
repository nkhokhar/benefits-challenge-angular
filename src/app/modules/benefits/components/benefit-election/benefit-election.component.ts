import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CostEstimatorComponent } from '../cost-estimator/cost-estimator.component';
import { EmployeeService, PersonCard } from 'src/app/services/employee.service';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

@Component({
  selector: 'benefit-election',
  templateUrl: './benefit-election.component.html',
  styleUrls: ['./benefit-election.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CostEstimatorComponent,
    MatCheckboxModule,
  ],
})
export class BenefitElectionComponent implements OnChanges {
  @Input() submitted!: boolean;

  availableCoverages = [
    {
      coverageType: 'Medical',
      effectiveDate: 'Jan 1, 2026',
      plan: 'Basic Medical',
    },
    {
      coverageType: 'Dental',
      effectiveDate: 'Jan 1, 2026',
      plan: 'Basic Dental',
    },
    {
      coverageType: 'Vision',
      effectiveDate: 'Jan 1, 2026',
      plan: 'Basic Vision',
    },
  ];

  persons: PersonCard[] = [];
  deductionPerPaycheck = 0;
  paycheckFrequency = 26;
  coverageLabel = 'Employee Only';
  coveredIndividuals!: PersonCard[];

  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const coverage = localStorage.getItem('coveredIndividuals');

    if (coverage) {
      this.coveredIndividuals = JSON.parse(coverage);
    }
  }

  ngOnInit() {
    this.persons = this.employeeService.createEmployeeData();

    if (this.coveredIndividuals) {
      this.persons.forEach((p) => {
        const person = this.coveredIndividuals.find(
          (sp) => sp.id === p.id && sp.isSelected
        );

        if (person) {
          p.isSelected = true;
        }
      });
    }

    this.calculateDeduction();
  }

  selectPerson(event: MatCheckboxChange, person: PersonCard) {
    const dependent = this.persons.find(
      (p) => p.id === person.id && p.relationship !== 'Self'
    );

    if (dependent) {
      dependent.isSelected = event.checked;
      this.calculateDeduction();
    }
  }

  calculateDeduction() {
    let totalCost = 0;
    const selectedIndividuals = this.persons.filter((p) => p.isSelected);

    selectedIndividuals.forEach((person) => {
      let cost = person.relationship === 'Self' ? 1000 : 500;

      if (person.name.toLowerCase().startsWith('a')) {
        cost *= 0.9;
      }

      totalCost += cost;
    });
    this.deductionPerPaycheck = totalCost / this.paycheckFrequency;

    this.setCoverageLabel(selectedIndividuals);
    localStorage.setItem('coveredIndividuals', JSON.stringify(this.persons));
  }

  setCoverageLabel(selectedIndividuals: PersonCard[]) {
    const childSelected = selectedIndividuals.find(
      (d) => d.relationship === 'Child'
    );

    const spouseSelected = selectedIndividuals.find(
      (d) => d.relationship === 'Spouse'
    );

    if (childSelected && spouseSelected) {
      this.coverageLabel = 'Employee + Family';
    } else if (childSelected && !spouseSelected) {
      this.coverageLabel = 'Employee + Children';
    } else if (!childSelected && spouseSelected) {
      this.coverageLabel = 'Employee + Spouse';
    } else {
      this.coverageLabel = 'Employee Only';
    }
  }
}
