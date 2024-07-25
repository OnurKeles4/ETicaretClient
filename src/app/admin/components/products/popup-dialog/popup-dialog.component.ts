import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../../../../services/common/models/product.service';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-popup-dialog',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, IxModule],
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent {

  form: FormGroup;

  @Input() selectedProduct: any;
  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    protected productservice: ProductService
  ) {
    this.form = this.fb.group({
      input1: [''],
      input2: [''],
      input3: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {



      
      this.dialogRef.close(this.form.value);

    }
  }
}