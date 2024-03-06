import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../core/interfaces/customer';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() customers: Customer[] = [];
  @Input() titleTable: string = '';
  @Output() deleteCustomer:  EventEmitter<number> = new EventEmitter();
  id: number = 0;
  deleteCustomers(id: number): void {
    this.deleteCustomer.emit(this.id);
  }
}