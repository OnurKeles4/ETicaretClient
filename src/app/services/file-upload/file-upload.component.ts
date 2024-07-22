import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientService } from '../common/http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../admin/alertify.service';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [NgxFileDropModule, CommonModule, IxModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService
  ) {}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append('file', _file, _file.name);
        console.log('file data');
        console.log(_file.name);
        console.log(_file);
        console.log(file.relativePath);
      });
    }
    //console.log("file data");

    //this.spinner.show(SpinnerType.BallAtom)
    this.httpClientService
      .post(
        {
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        } as FileUploadOptions,
        fileData
      ).subscribe((data) => {
        console.log("dataaa");
        
          console.log(data);
          
          const message: string = 'Dosyalar başarıyla yüklenmiştir.';

          //this.spinner.hide(SpinnerType.BallAtom);
          if (this.options.isAdminPage) {
            this.alertifyService.message(message, {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
          } else {
            this.alertifyService.message('Başarılı.', {
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
          }
        },
        (errorResponse: HttpErrorResponse) => {
          
          const message: string =
            'Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.';
          console.log(this.options);

          //this.spinner.hide(SpinnerType.BallAtom)
          if (this.options.isAdminPage) {
            this.alertifyService.message(message, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight,
            });
          } else {
            this.alertifyService.message('Başarsız.', {
              messageType: MessageType.Error,
              position: Position.TopRight,
            });
          }
        }
      );
  }

  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //    width: '250px',
  //    data: FileUploadDialogState.Yes,
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == FileUploadDialogState.Yes)
  //      afterClosed();
  //  });
  //}
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
