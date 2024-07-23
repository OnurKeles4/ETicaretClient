import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent  extends BaseDialog <FileUploadDialogComponent> {

  constructor(dialogRef: MatDialogRef<FileUploadDialogComponent>) {
    super(dialogRef); 
  }

  onNoClick(): void {
    //...
  }

  onYesClick(): void {
    this.dialogRef.close();
  }
}
