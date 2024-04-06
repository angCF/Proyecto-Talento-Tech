import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CustomerModel } from '../../core/models/customer.model';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomers() {
    return this.httpClient.get(`${baseUrl}/customer`);
  } 
  addCustomer(customer: CustomerModel) {
    return this.httpClient.post(`${baseUrl}/customer`,customer);
  }
}
