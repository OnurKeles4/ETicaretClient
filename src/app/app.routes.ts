import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { OrderComponent } from './admin/components/order/order.component';
import { LayoutComponent } from './admin/layout/layout.component';

import { ProductsComponent as adminProduct}  from './admin/components/products/products.component';
import { ProductsComponent as uiProduct } from './ui/components/products/products.component';

import { HomeComponent } from './ui/components/home/home.component';
import { BasketsComponent } from './ui/components/baskets/baskets.component';
import { CustomerComponent } from './admin/components/customer/customer.component';

export const routes: Routes = [
    
    
    { path: 'admin', component: LayoutComponent, children: [
        { path: '', component: DashboardComponent },
        { path: 'customer', component: CustomerComponent},
        { path: 'products', loadComponent: () => import('./admin/components/products/products.component').then(m => m.ProductsComponent) },
        { path: 'order', component: OrderComponent },
        
    ]},

    { path: '', component: HomeComponent},
    { path: 'basket', component: BasketsComponent},
    { path: 'products', loadComponent: () => import('./ui/components/products/products.component').then(m => m.ProductsComponent) },
    //{ path: 'ui-product', component: uiProduct}
];
