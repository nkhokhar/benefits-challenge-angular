import { Injectable } from '@angular/core';
import { Employee, Person } from '../models/enrollment';
import { RelationType } from '../enrollment.const';

export interface PersonCard {
  id: number;
  name: string;
  relationship: string;
  gender: string;
  isSelected?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  getEmployee(): Employee {
    const savedData = localStorage.getItem('employeeData');

    if (savedData) {
      return JSON.parse(savedData);
    }

    const employeeData: Employee = {
      id: 100,
      firstName: 'John',
      lastName: 'Doe',
      dependents: [
        {
          id: 200,
          firstName: 'Jane',
          lastName: 'Doe',
          relationship: 'Spouse',
          gender: 'Female',
        },
        {
          id: 300,
          firstName: 'Jack',
          lastName: 'Doe',
          relationship: 'Child',
          gender: 'Male',
        },
      ],
      gender: 'Male',
      relationship: 'Self',
    };

    localStorage.setItem('employeeData', JSON.stringify(employeeData));

    return employeeData;
  }

  addDependent(dependent: Person): void {
    const employee = this.getEmployee();

    dependent.id = employee.dependents.length + 1;
    employee.dependents.push(dependent);
    localStorage.setItem('employeeData', JSON.stringify(employee));
  }

  updateDependent(person: Person): void {
    const employee = this.getEmployee();

    if (!person.relationship) {
      employee.firstName = person.firstName;
      employee.lastName = person.lastName;
    } else {
      const dependent = employee.dependents.find((d) => d.id === person.id);
      if (dependent) {
        dependent.firstName = person.firstName;
        dependent.lastName = person.lastName;
        dependent.gender = person.gender;
        dependent.relationship = person.relationship;
      }
    }

    localStorage.setItem('employeeData', JSON.stringify(employee));
  }

  deleteDependent(dependent: any) {
    const employee = this.getEmployee();

    employee.dependents = employee.dependents.filter(
      (d) => d.id !== dependent.id
    );

    localStorage.setItem('employeeData', JSON.stringify(employee));
  }

  createEmployeeData(): PersonCard[] {
    let cards = [];

    const employee = this.getEmployee();

    cards.push({
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
      relationship: RelationType.self,
      gender: employee.gender,
      isSelected: true,
    } as PersonCard);

    employee.dependents.forEach((dependent: Person) => {
      cards.push({
        id: dependent.id,
        name: `${dependent.firstName} ${dependent.lastName}`,
        relationship: dependent.relationship,
        gender: dependent.gender,
        isSelected: false,
      } as PersonCard);
    });

    return cards;
  }
}
