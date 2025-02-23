export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  dob?: string;
  gender: string;
  relationship: string;
}

export interface Employee extends Person {
  dependents: Person[];
}

// export interface Dependent extends Person {
//   relationship: RelationType;
// }

// export interface RelationType {
//   code: string;
//   name: string;
// }

// export interface Gender {
//   code: string;
//   name: string;
// }
