import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OptionCalculator } from '../../shared/types/interfaces/option-calculator';
import { Observable } from 'rxjs';
import { MockDataService } from './mock/mock.data.service';
import { ExpensesInTheMonth } from '../../shared/types/interfaces/month-expenses-in-the-month';

@Injectable({ providedIn: 'root' })
export class ExpenseHttpService {
  #http = inject(HttpClient);
  #mockData = inject(MockDataService);

  public getExpenses(): Observable<ExpensesInTheMonth[]> {
    //return this.#http.get<ExpensesInTheMonth[]>('http://localhost:8080/expenses');
    return this.#mockData.getExpensesMock();
  }
}
