import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { IxModule } from '@siemens/ix-angular';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { DataService } from '../../../../services/ui/animation/animation-service';
import { SimplebuttonComponent } from "../../../../common/components/simplebutton/simplebutton.component";
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [IxModule, FontAwesomeModule, PopupDialogComponent, SimplebuttonComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  icon = faEdit;
  onOk = new EventEmitter();
  label: string = "Update";
  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() animationEvent = new EventEmitter<boolean>();
  @Output() disableEvent = new EventEmitter<boolean>();
  
  @Input() isDisabled: boolean = true;
  @Input() selectedProduct: any;
  

  constructor(protected productservice: ProductService,private alertify: AlertifyService,
    public dialog: MatDialog, private dataService: DataService
  ) {    this.sendData();}
  
  recieveMessage($event: boolean) {
    console.log("Recieved Message");
    this.isDisabled = $event;
    //this.selectedProduct = null;
  }  

  public editSelected() {
    console.log("Edit Selected");
    this.isDisabled = true;
  }

  openDialog(): void {
    if(this.isDisabled != true) {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '300px',
      data: {
        title: 'Dialog Title',
        description: 'Edit your data'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      const edit_product: any = this.productservice.readWithId(this.selectedProduct.id);
      edit_product.id = this.selectedProduct.id;
      edit_product.name = result.input1;
      edit_product.stock = parseInt(result.input2);
      edit_product.price = parseFloat(result.input3);

      this.productservice.update(edit_product).subscribe(() => {
          this.alertify.message("Ürün başarıyla değiştirildi", {
            messageType: MessageType.Message,
            position: Position.BottomRight,
            delay: 3,
            dismissOthers: true
          ,});
     
        });
        console.log("emit send in update");
        this.sendData();
        this.disableEvent.emit(true);
      }
    });
  }
  else {
    //Doesn't work at the moment
    console.log('the button is disabled');
  }
}

  sendData() {
    this.dataService.setData(true);
  }
}
