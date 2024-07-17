import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IxModule } from '@siemens/ix-angular';

import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatListModule, IxModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
