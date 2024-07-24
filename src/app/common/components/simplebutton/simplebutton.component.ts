import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IxModule, IxSpinner } from '@siemens/ix-angular';
import { DataService } from '../../../services/ui/animation/animation-service';

@Component({
  selector: 'app-simplebutton',
  standalone: true,
  imports: [IxModule, CommonModule, FontAwesomeModule],
  templateUrl: './simplebutton.component.html',
  styleUrl: './simplebutton.component.scss'
})
export class SimplebuttonComponent implements OnDestroy {  
  showSpinner: boolean = false;
  @Input() isDisabled: boolean = true;
  @Input() label: string;
  @Input() icon: any;
  attempt: boolean = true;
  subscription: any;
  constructor(private dataService: DataService) {
    this.subscription = this.dataService.dataObs.subscribe(data => {
      this.isDisabled = data;
      console.log("Data has been set", this.isDisabled);
      
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

    active() {
      this.attempt = false;
    console.log("SPIN STARTED");
    this.showSpinner = true;
    this.isDisabled = true;
    setTimeout(() => {
    
      console.log("SPIN STOPPED");    
        this.showSpinner = false;
        this.isDisabled = true;
    }, 1000);
    }
  }

