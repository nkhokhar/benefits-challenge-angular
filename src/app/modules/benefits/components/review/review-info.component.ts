import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RelationType } from 'src/app/enrollment.const';
import { Employee, Person } from 'src/app/models/enrollment';
import { EmployeeService, PersonCard } from 'src/app/services/employee.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEditDependentComponent } from '../add-edit-dependent/add-edit-dependent.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'review-info',
  templateUrl: './review-info.component.html',
  standalone: true,
  imports: [CardComponent, CommonModule, MatDialogModule],
  styleUrls: ['./review-info.component.scss'],
})
export class ReviewInfoComponent {
  employee!: Employee;
  personCards!: PersonCard[];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.employee = this.employeeService.getEmployee();
    this.personCards = this.employeeService.createEmployeeData();
  }

  openDependentModal(person?: Person) {
    this.dialog
      .open(AddEditDependentComponent, {
        width: '600px',
        position: {
          top: '100px',
        },
        data: {
          person: person ?? null,
        },
      })
      .afterClosed()
      .subscribe((dependentData) => {
        if (dependentData) {
          !!person
            ? this.employeeService.updateDependent(dependentData)
            : this.employeeService.addDependent(dependentData);
          this.loadEmployeeData();
        }
      });
  }

  deleteDependent(person: PersonCard) {
    this.employeeService.deleteDependent(person);
    this.loadEmployeeData();
  }

  editPerson(person: PersonCard) {
    if (person.relationship !== RelationType.self) {
      const dependent = this.employee.dependents.find(
        (d) => d.id === person.id
      );
      this.openDependentModal(dependent);
    } else {
      this.openDependentModal(this.employee);
    }
  }
}
