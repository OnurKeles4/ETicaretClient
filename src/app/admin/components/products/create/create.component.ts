import { Component } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';
import { ProductService } from '../../../../services/common/models/product.service';
import { CreateProduct } from '../../../../contracts/create_product';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [IxModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
    constructor(private productservice: ProductService, private alertify: AlertifyService){ } 

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
   
   const create_product:  CreateProduct = new CreateProduct();

  create_product.name = name.value;
  create_product.stock = parseInt(stock.value);
  create_product.price = parseFloat(price.value);

    this.productservice.create(create_product, () => {
      this.alertify.message("Ürün başarıyla eklendi", {
        messageType: MessageType.Notify,
        position: Position.BottomRight,
        delay: 3,
        dismissOthers: true
      ,});
      
    },
    errorMessage => {
      this.alertify.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.BottomRight,
      });
    });
    this.productservice.read();
  }
}
