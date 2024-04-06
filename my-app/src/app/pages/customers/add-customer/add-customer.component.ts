import { Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import {  Router, RouterLink } from '@angular/router';
import { ViewCustomerComponent } from "../view-customer/view-customer.component";
import { CustomerService } from '../../../services/customers/customers.service';
import { CustomerModel } from '../../../core/models/customer.model';
import { ROUTES_APP } from '../../../core/enum/routes.enum';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
  imports: [ReactiveFormsModule, ViewCustomerComponent, RouterLink]
})
export class AddCustomerComponent {
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    documentType: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required])
  });
  // @Output() customerValue: EventEmitter<Customer> = new EventEmitter();
  constructor(private customerService: CustomerService, private router:Router) { }

  addCustomer() {
    const newCustomer = this.customerForm.value;
    if (this.customerForm.valid) {
      const data: CustomerModel = {
        name: newCustomer.name || '',
        lastName: newCustomer.lastName || '',
        address: newCustomer.address || '',
        email: newCustomer.email || '',
        phone: newCustomer.phone || '',
        documentType: newCustomer.documentType || '',
        documentNumber: newCustomer.documentNumber || '',
        city: newCustomer.city || '',
        state: Boolean(newCustomer.state) || false
      }
      this.customerService.addCustomer(data).subscribe({
        next: (res: any) => {
          console.log('Customer created', res);
        }, error: (error: any) => {
          console.log('Error creating customer', error);
        }
      });
      console.log('Sending contact', this.customerForm);
      // this.customerValue.emit(this.newCustomer);
      // this.listCustomer()
    }
  }
  get ROUTES_APP(){
    return ROUTES_APP;
  }
  shoWCustomers(){
    // this.show = true;
    this.router.navigateByUrl(ROUTES_APP.CUSTOMERS);
  }
}
