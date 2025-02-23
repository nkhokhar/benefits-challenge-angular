import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-edit-dependent',
  templateUrl: './add-edit-dependent.component.html',
  styleUrls: ['./add-edit-dependent.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class AddEditDependentComponent {
  dependentForm: FormGroup;
  relationshipOptions = ['Spouse', 'Child'];
  genderOptions = ['Male', 'Female'];

  hideRelationship: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditDependentComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dependentForm = this.fb.group({
      id: [data?.person?.id],
      firstName: [data?.person?.firstName, Validators.required],
      lastName: [data?.person?.lastName, Validators.required],
      dob: [''],
      relationship: [data?.person?.relationship, Validators.required],
      gender: [data?.person?.gender, Validators.required],
    });

    if (data?.person) {
      if (data.person.relationship === 'Self') {
        this.dependentForm.removeControl('relationship');
        this.hideRelationship = true;

        this.dependentForm.get('gender')?.disable({ onlySelf: true });
      }
    }
  }

  addDependent() {
    if (this.dependentForm.valid) {
      this.dialogRef.close(this.dependentForm.value);
    }
  }
}
