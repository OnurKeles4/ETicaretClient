import { DataSource } from '@angular/cdk/collections';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  createGrid, } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-community/styles/ag-grid.css';
/* Quartz Theme Specific CSS */
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ListProduct } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';

import { DeleteComponent } from '../delete/delete.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faTrashCan, faEdit} from '@fortawesome/free-solid-svg-icons'
import { IxModule } from '@siemens/ix-angular';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { UpdateComponent } from '../update/update.component';
import { DataService } from '../../../../services/ui/animation/animation-service';

// import a from '../../../assets/mock_ticketsystem_data.json';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AgGridAngular, CommonModule,FontAwesomeModule, IxModule, DeleteComponent, UpdateComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
  
})

export class ListComponent {
  selectedProduct: any;
  selectedId: string = "";
  icon1 = faEdit;
  icon2 = faTrashCan;
  
  isDisabled: boolean = true;
  isBrowser: boolean;
  isDataReady: boolean = false;
  isRefreshed: boolean = false;
  rowData: ListProduct[] = [];
  //refresh: boolean = false;
  pagination: boolean = true;
  paginationPageSize: number = 10;
  subscription: any;

  private gridApi;
  private gridColumnApi;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, protected productservice: ProductService, 
  private dataService: DataService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.sendData();
    this.subscription = this.dataService.dataObs.subscribe(data => {
    //console.log('Data has been set', data);
    
        this.isDisabled = data;
        
      });
      this.subscription.unsubscribe();
        this.subscription = this.dataService.refreshObs.subscribe(data => {
      //console.log('Data has been set in refreshObs', data);
      
          this.isRefreshed = data;
          
    this.updateList();
        });
  }

  
  ngOnInit() {
    this.updateList();
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  //   this.updateList();
  // }

  onGridReady($event) {
    
  }

  updateRow() {
    const rowNode = this.gridApi.getRowNode('0');
    if (rowNode) {
      rowNode.setData({ name: 'Updated Name', number: 999, date: '2024-01-01' });
    }
  }

  removeRow() {

    this.gridApi.applyTransaction({ remove: this.selectedProduct });
  }




 

  recieveMessage($event: boolean) {
    console.log("Recieved Message", this.isDisabled);
    this.isDisabled = $event;
    
    this.updateList();
    //this.selectedProduct = null;
  }  

  changeProduct(event: any) {
    //console.log("Product Changed");
    //console.log("Selected Product", selectedRows);
    
    
    //console.log(event);
    this.selectedProduct = event.data;
    //console.log(this.selectedProduct);  
    this.isDisabled = false;
    this.sendData();
  }
  
  public updateList() {
    
    this.productservice.read().subscribe((products) => {
      this.rowData = products;
      this.isDataReady = true;
      // console.log("Row Data");
      // console.log(this.rowData);
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

  sendData() {
    this.dataService.setData(this.isDisabled);
  }
}
