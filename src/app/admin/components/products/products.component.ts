import { Component } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import { HttpClientService } from '../../../services/common/http-client.service';
import { RouterModule } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [IxModule, CreateComponent, ListComponent, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  constructor(private httpClientService: HttpClientService) { 
    
  }


  ngOnInit(): void{
    // this.httpClientService.get({
    //   controller: "products"
    // }).subscribe(data => console.log());

    

    // this.httpClientService.post({
    //   controller: "products"
    //   }, {
    //     name: "Kalem",
    //     stock: 100,
    //     price: 15
    //   }).subscribe(data => console.log(data));
      
    // this.httpClientService.post({
    //   controller: "products"
    //   }, {
    //     name: "Defter",
    //     stock: 2000,
    //     price: 55
    //   }).subscribe(data => console.log(data));

//     this.httpClientService.put({
//       controller: "products"
//     },
//   {
//     id: "c2a12879-feb9-4474-9daa-004ea32ede3b",
//     name: "Defter",
//     stok: 1000,
//     price: 30
//   }).subscribe(data => console.log(data));
//   this.httpClientService.delete({
//     controller: "products"
//  } , "960d1a37-74ed-4d96-a064-032f67a138fd").subscribe(data => console.log(data));

}

}
