import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SalesComponent } from './pages/sales/sales.component';
import { AddCustomerComponent } from './pages/customers/add-customer/add-customer.component';
import { ViewCustomerComponent } from './pages/customers/view-customer/view-customer.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        title: 'Login',
        children: [{ path: 'login', component: AuthenticationComponent }],
    },
    {
        path: 'home',
        title: 'Home',
        canActivate : [authGuard],
        children: [
            {
                path: '',
                title: 'Home',
                component: HomeComponent
            },
            {
                path: 'sales',
                title: 'Sales',
                component: SalesComponent,
            },
            {
                path: 'about',
                title: 'About',
                component: AboutComponent,
            },
            {
                path: 'contact',
                title: 'Contact',
                component: ContactComponent,
            },
            {
                path: 'customers',
                title: 'Customers',
                component: ViewCustomerComponent,
            },
            {
                path: 'add-customer',
                title: 'Add Customer',
                component: AddCustomerComponent,
            },
        ],
    },
    { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];
