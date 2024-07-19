import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [IxModule, FontAwesomeModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  icon = faTrashCan;

  @Input() selectedProduct: any;
  @Input() isDisabled!: boolean;

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(protected productservice: ProductService,private alertify: AlertifyService) {}

  public deleteSelected() {
    console.log("Delete Selected in Delete, id:", this.selectedProduct.id);
    
    this.productservice.delete(this.selectedProduct.id).subscribe(() => {
      this.alertify.message("Ürün başarıyla silindi", {
        messageType: MessageType.Message,
        position: Position.BottomRight,
        delay: 3,
        dismissOthers: true
      ,});
 
    },() => {
      this.alertify.message("Ürün silinirken Hata oluştu", {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.BottomRight,
      });
    });
    this.messageEvent.emit(true);
  }
}
