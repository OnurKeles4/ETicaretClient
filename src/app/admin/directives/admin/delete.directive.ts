// import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
// import { HttpClientService } from '../../../services/common/http-client.service';
// import { IxSpinner } from '@siemens/ix-angular';
// import { MatDialog } from '@angular/material/dialog';
// import { AlertifyService } from '../../../services/admin/alertify.service';

// @Directive({
//   selector: '[appDelete]' ,
//   standalone: true
// })
// export class DeleteDirective {

//   constructor(
//     private element: ElementRef,
//     private _renderer: Renderer2,
//     private httpClientService: HttpClientService,
//     private spinner: IxSpinner,
//     public dialog: MatDialog,
//     private alertifyService: AlertifyService,
//   ) {
//     const img = _renderer.createElement("img");
//     img.setAttribute("src", "../../../../../assets/delete.png");
//     img.setAttribute("style", "cursor: pointer;");
//     img.width = 25;
//     img.height = 25;
//     _renderer.appendChild(element.nativeElement, img);
//   }

//   @Input() id: string;
//   @Input() controller: string;
//   @Output() callback: EventEmitter<any> = new EventEmitter();

//   @HostListener("click")
//   onclick() {

//   }

// }
