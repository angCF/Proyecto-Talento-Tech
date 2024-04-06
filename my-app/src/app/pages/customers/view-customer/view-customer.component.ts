import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../../../core/interfaces/customer';
import { TableComponent } from "../../../components/table/table.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCustomerComponent } from "../add-customer/add-customer.component";
import { CustomerService } from '../../../services/customers/customers.service';
import { ROUTES_APP } from '../../../core/enum/routes.enum';

@Component({
    selector: 'app-view-customer',
    standalone: true,
    templateUrl: './view-customer.component.html',
    styleUrl: './view-customer.component.css',
    imports: [RouterLink, TableComponent, ReactiveFormsModule, AddCustomerComponent]
})
export class ViewCustomerComponent implements OnInit {
  // constructor(){}
  // show: Boolean = false;
  // customerForm = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   lastName: new FormControl('', [Validators.required]),
  //   address: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   phone: new FormControl('', [Validators.required]),
  //   documentType: new FormControl('', [Validators.required]),
  //   documentNumber: new FormControl('', [Validators.required]),
  //   city: new FormControl('', [Validators.required]),
  //   state: new FormControl('', [Validators.required])
  // });
  // sendContact(): void {
  //   console.log('Sending contact', this.customerForm);
  // }
  titleTable: string = 'List of customers';
  myCustomers: Customer[] = [];
  constructor(private router:Router, private customerService:CustomerService){

  }
  ngOnInit(): void {
    // this.myCustomers.push({
    //   id: 1,
    //   name: 'Angie',
    //   lastName: 'Castro',
    //   address: 'Calle 123',
    //   email: 'ac46563@gmail.com',
    //   phone: '1234567890',
    //   documentType: 'CC',
    //   documentNumber: '123456789',
    //   city: 'Ciudad de México',
    //   state: true
    // },
    // {
    //   id: 2,
    //   name: 'Juan',
    //   lastName: 'Pérez',
    //   address: 'Carrera 56',
    //   email: 'correo2@gmail.com',
    //   phone: '32143875854',
    //   documentType: 'CE',
    //   documentNumber: '0234234353435',
    //   city: 'Bogotá',
    //   state: true
    // },
    // {
    //   id: 3,
    //   name: 'María',
    //   lastName: 'Pérez',
    //   address: 'Calle 34',
    //   email: 'correo3@gmail.com',
    //   phone: '3253534435',
    //   documentType: 'PAS',
    //   documentNumber: '1134567890',
    //   city: 'Lima',
    //   state: false
    // });
    // this.myCustomers.forEach((customer) => {
    //   console.log(customer);
    // })
    this.customerService.getCustomers().subscribe((customers:any) => {
      this.myCustomers = customers.customers;
      console.log(this.myCustomers);
    });
  }
  showAddCustomer(){
    this.router.navigateByUrl(ROUTES_APP.ADD_CUSTOMER);
  }
  deleteCustomer(idCustomer: number): void {
    this.myCustomers = this.myCustomers.filter(customer => customer._id!== idCustomer);
    console.log(this.myCustomers);
    //Elimina el id customer que aparece de primeras
    // this.myCustomers.slice(idCustomer,1);
  }
  editCustomer(customer: Customer): void {
    console.log(customer);
  }
  addCustomer(customer: Customer): void {
    this.myCustomers.push(customer);
    console.log('customer added', customer);
    console.log(this.myCustomers);
  }
  get ROUTES_APP(){
    return ROUTES_APP;
  }
}