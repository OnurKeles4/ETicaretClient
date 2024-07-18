import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { ListProduct } from '../../../contracts/list_product';
import { LastValueFromConfig } from 'rxjs/internal/lastValueFrom';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataloaded: boolean = false;
  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {

  this.httpClientService.post({controller: "products"}, product)
  .subscribe(result => {successCallBack();

  },(errorResponse: HttpErrorResponse) => {
  const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;

  let message = "";
  
  _error.forEach((v, index) => {
    v.value.forEach((_v, _index) => {
      message += `${_v}<br>`;
    });
  });
  if(errorCallBack)
    errorCallBack(message);   
});  
}



   read(): Observable<ListProduct[]> {
    
    var a = this.httpClientService.get<ListProduct[]>({
      controller: "products"
    });
    return a;
    // console.log("read");
    // console.log(a);
    // return a;

  }

}
