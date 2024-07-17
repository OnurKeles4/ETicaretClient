import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  message(message : string, title: string, messageType: ToastrMessageType, position: ToastrPosition = ToastrPosition.TopLeft) {
this.toastr[messageType](message, title, {
  positionClass: position

}

);
  }
}

export enum ToastrMessageType {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning"
}

export enum ToastrPosition {
  TopLeft = "toast-top-left",
  TopRight = "toast-top-right",
  TopCenter = "toast-top-center",
  BottomLeft = "toast-bottom-left",
  BottomRight = "toast-bottom-right",
  BottomCenter = "toast-bottom-center",
  BottomFullWidth = "toast-top-full-width",
  TopFullWidth = "toast-top-full-width",
}