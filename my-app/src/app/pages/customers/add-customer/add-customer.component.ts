import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../../core/interfaces/customer';
import { Router } from '@angular/router';
import { ViewCustomerComponent } from "../view-customer/view-customer.component";

@Component({
    selector: 'app-add-customer',
    standalone: true,
    templateUrl: './add-customer.component.html',
    styleUrl: './add-customer.component.css',
    imports: [ReactiveFormsModule, ViewCustomerComponent]
})
export class AddCustomerComponent {
  constructor(private router:Router){}
  emit: Boolean = false;
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
  newCustomer: Customer = {} as Customer;

  addCustomer() {
    if (this.customerForm.valid) {
      this.newCustomer = {
        _id: 0,
        name: this.customerForm.value.name || '',
        lastName: this.customerForm.value.lastName || '',
        address: this.customerForm.value.address || '',
        email: this.customerForm.value.email || '',
        phone: this.customerForm.value.phone || '',
        documentType: this.customerForm.value.documentType || '',
        documentNumber: this.customerForm.value.documentNumber || '',
        city: this.customerForm.value.city || '',
        state: Boolean(this.customerForm.value.state) || false
      };
      this.emit = true;
      console.log('Sending contact', this.newCustomer);
      // this.customerValue.emit(this.newCustomer);
      // this.listCustomer()
    }
  }

  listCustomer(): void {
    this.router.navigate(['/view-customer']);
  }
}
