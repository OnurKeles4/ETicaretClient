import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
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


    /*
    Try to mask the updated date and created date with more similar text such as: 2024-07-12, 23:54 or smth
    */
   read(): Observable<ListProduct[]> {
    
    var a = this.httpClientService.get<ListProduct[]>({
      controller: "products"
    });
    return a;


    // console.log("read");
    // console.log(a);
    // return a;

  }
    //Consider making it async
  async readWithId(id: string): Promise<Observable<ListProduct[]>> {
    //console.log("start read with Id");
    
    const readIdObs: Observable<any> = this.httpClientService.get<ListProduct[]>({
      controller: "products"
    }, id);
    //console.log("obs read with Id");
     //console.log(a);
    
    var a = await firstValueFrom(readIdObs);

    return a;


     // return a;

  }

  async delete(id: string) {
    //console.log("Delete Selected in Service, id:", id);
    
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);
    //console.log("rweqe",a);
    
    var a = await firstValueFrom(deleteObservable);
  }

  async update(product: ListProduct): Promise<void> {
    //console.log("Update Selected in Service, product:", product);
    
    const updateObs: Observable<any> = this.httpClientService.put({
      controller: "products"
    }, product)

    var a = await firstValueFrom(updateObs);

    return a;
  }

}
