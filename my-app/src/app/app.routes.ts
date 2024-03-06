import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SalesComponent } from './pages/sales/sales.component';
import { AddCustomerComponent } from './pages/customers/add-customer/add-customer.component';
import { ViewCustomerComponent } from './pages/customers/view-customer/view-customer.component';

export const routes: Routes = [{
    path: '',
    title: 'Home',
    component: HomeComponent
},
{
    path: 'add-customer',
    title: 'Add Customer',
    component: AddCustomerComponent
},
{
    path: 'view-customer',
    title: 'Customers',
    component: ViewCustomerComponent
},
{
    path: 'sales',
    title: 'Sales',
    component: SalesComponent,
}
];
