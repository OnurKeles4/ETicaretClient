import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { FooterComponent } from './admin/layout/components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { IxModule } from '@siemens/ix-angular';

declare var $: any
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, RouterModule, FooterComponent, IxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ETicaretClient';
  
  constructor(private toastr: CustomToastrService) {
    // this.showSuccess(); 
  }
  showSuccess() {
   console.log("Hello world!");
   this.toastr.message("Hello", "Success", ToastrMessageType.Info, ToastrPosition.TopLeft);
   
 }
  // alertMe() {
  //   console.log("AAA");
    
  //     $(document).ready(() =>{
  //   console.log("BBB");
    
  //       alert("aqwewerqw");
  //      })
  // }
}
