import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient) { }

  getCustomers() {
    return this.httpClient.get(`${baseUrl}/customer`);
  } 
}
