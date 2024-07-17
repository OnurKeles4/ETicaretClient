import { Component } from '@angular/core';
import { BasketsComponent } from './components/baskets/baskets.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../admin/layout/components/footer/footer.component';

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [BasketsComponent, HomeComponent, ProductsComponent, RouterModule],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss'
})
export class UiComponent {

}
