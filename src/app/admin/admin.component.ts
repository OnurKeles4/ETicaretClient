import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { UiComponent } from '../ui/ui.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [LayoutComponent, CommonModule, UiComponent, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
