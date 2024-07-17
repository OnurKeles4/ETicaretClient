import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule, MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  
  
//    dismissAll() {
//       AlertifyService.dismissOthers();
//    }

//    alertMe() {
//     this.alertify.message("Hello", MessageType.Notify, Position.TopLeft, true);
// }




}
