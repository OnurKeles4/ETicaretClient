import { DataSource } from '@angular/cdk/collections';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ListProduct } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { log } from 'console';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faTrashCan, faEdit} from '@fortawesome/free-solid-svg-icons'
import { IxModule } from '@siemens/ix-angular';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';

// import a from '../../../assets/mock_ticketsystem_data.json';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AgGridAngular, CommonModule,FontAwesomeModule, IxModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
  
})
export class ListComponent {
  selectedProduct: any;
  selectedId: string = "";
  isDisabled: boolean = true;
  icon1 = faEdit;
  icon2 = faTrashCan;
  
  isBrowser: boolean;
  isDataReady: boolean = false;
  rowData: ListProduct[] = [];
  
  pagination: boolean = true;
  paginationPageSize: number = 10;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, protected productservice: ProductService,
  private alertify: AlertifyService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit() {
    this.updateList();
  }

  public deleteSelected() {
    console.log("Delete Selected in List, id:", this.selectedProduct.id);
    
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
    this.isDisabled = true;
    //console.log("new rowdata: ");
    console.log(this.rowData);
  }

  public editSelected() {
    console.log("Edit Selected");
    this.isDisabled = true;
  }
  changeProduct(event: any) {
    console.log("Product Changed");
    console.log(event);
    this.selectedProduct = event.data;
    console.log(this.selectedProduct);  
    this.isDisabled = false;
  }
  
  public updateList() {
    this.productservice.read().subscribe((products) => {
      this.rowData = products;
      this.isDataReady = true;
      console.log("Row Data");
      console.log(this.rowData);
    },
  (error) => {
    console.log('error fetching produtcs', error);
  });
  }
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "stock" },
    { field: "price" },
    { field: "createdDate" },
    { field: "updatedDate" }
  ];
}
