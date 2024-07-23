import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = new BehaviorSubject(false);
  dataObs = this.data.asObservable();

  setData(data: boolean) {
    // console.log("data has been set");
     console.log(data);
    // console.log(this.dataObs$);
    
    this.data.next(data);
  }
}