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
// import a from '../../../assets/mock_ticketsystem_data.json';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
  
})
export class ListComponent {
  
  isBrowser: boolean;
  isDataReady: boolean = false;
  rowData: ListProduct[] = [];
  pagination: boolean = true;
  paginationPageSize: number = 10;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, protected productservice: ProductService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit() {
    this.updateList();
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
