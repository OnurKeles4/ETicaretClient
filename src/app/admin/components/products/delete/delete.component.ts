
 import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild,}from '@angular/core';
 import { IxModule } from '@siemens/ix-angular';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
 import { ProductService } from '../../../../services/common/models/product.service';
 import { AlertifyService, MessageType, Position}from '../../../../services/admin/alertify.service';
 import { DataService } from '../../../../services/ui/animation/animation-service';
import { SimplebuttonComponent } from '../../../../common/components/simplebutton/simplebutton.component';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
 declare function animateButton(): void;
 @Component({selector: 'app-delete',
  standalone: true,
  imports: [IxModule, FontAwesomeModule, SimplebuttonComponent, FileUploadDialogComponent],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss',],
})

export class DeleteComponent {
  @ViewChild('animateButton') animateButton: ElementRef<HTMLButtonElement>;
  icon = faTrashCan;
  flag: boolean;
  aniText: string;
  aniProgress: boolean;
  
  label: string = 'Delete';

  @Input() selectedProduct: any;

  @Output() messageEvent = new EventEmitter<boolean>();
  //@Output() animationEvent = new EventEmitter<boolean>();
  @Output() disableEvent = new EventEmitter<boolean>();
  @Input() isDisabled: boolean = true;
  constructor(
    protected productservice: ProductService,
    private alertify: AlertifyService,
    private renderer: Renderer2,
    private dataService: DataService) {

    }
  
  async deleteSelected() {
    if(this.isDisabled != true) {
      //console.log('Delete Selected in Delete, id:', this.isDisabled);

    await this.productservice.delete(this.selectedProduct.id).then(
      () => {

        this.alertify.message('Ürün başarıyla silindi', {
          messageType: MessageType.Message,
          position: Position.BottomRight,
          delay: 3,
          dismissOthers: true,
        });

        this.flag = true;
        console.log('Normal:');
      
        this.sendData(this.flag);
        //this.animationEvent.emit(true);
        this.disableEvent.emit(true);
        
      }
      
    );
  }
    else {
      //Doesn't work at the moment
      console.log('the button is disabledAA');
      
        this.alertify.message('Ürün Silmek için ürün seçin', {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.BottomRight,
        });


        this.flag = false;
        
        
        //console.log('Error occurred while deleting the product:');
        this.sendData(this.flag);
        //this.animationEvent.emit(false);
        this.disableEvent.emit(false);
      
    }
  }
  sendData(flag: boolean) {
    //console.log("SendData in Delete being sent");
    
    this.dataService.setData(flag);
    
  }

  
}
