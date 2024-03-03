import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  OptionCalculator,
  OptionTypeEnum,
} from '../../../shared/types/interfaces/option-calculator';
import {
  ExpensesInTheMonth,
  ExpenseValue,
  ModalitiesExpense,
} from '../../../shared/types/interfaces/month-expenses-in-the-month';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  constructor() {}

  getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  getRandomName = () => `Expense ${Math.random().toString(36).substring(7)}`;

 
  getRandomModalities = (): ModalitiesExpense[] => {
    const modalities = [
      { id: 1, name: 'Modality 1', enabled: true },
      { id: 2, name: 'Modality 2', enabled: false },
      { id: 3, name: 'Modality 3', enabled: true },
    ];
    return modalities.filter(() => Math.random() > 0.5);
  };


  getExpenseValues = (
    monthId: number,
    expenseId: number,
    modalities: ModalitiesExpense[]
  ): ExpenseValue[] => {
    return modalities.map(modality => ({
      id: this.getRandomInt(1, 10000),
      expenseId: expenseId,
      date: new Date(2024, monthId - 1, this.getRandomInt(1, 28)),
      value: this.getRandomInt(100, 1000),
      modalityId: modality.id,
    }));
  };

 
  generateMockExpenses = (): ExpensesInTheMonth[] => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    return months.map((monthName, index) => ({
      id:this.getRandomInt(1,1000),
      monthId: index + 1,
      monthName: monthName,
      expensesMonth: new Array(this.getRandomInt(1, 5)).fill(null).map(() => {
        const expenseId = this.getRandomInt(1, 10000);
        const modalities = this.getRandomModalities();
        return {
          expenseId: expenseId,
          name: this.getRandomName(),
          modalities: modalities,
          expensesValues: this.getExpenseValues(
            index + 1,
            expenseId,
            modalities
          ),
        };
      }),
    }));
  };

  getAllOptions(): Observable<OptionCalculator[]> {
    const mockOptionCalculators: OptionCalculator[] = [
      {
        id: 1,
        name: 'OpenParenthesis',
        description: 'Open Parenthesis',
        value: null,
        visibleValue: '(',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 2,
        name: 'CloseParenthesis',
        description: 'Close Parenthesis',
        value: null,
        visibleValue: ')',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 3,
        name: 'Clear',
        description: 'Clear',
        value: null,
        visibleValue: 'C',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 4,
        name: 'Divide',
        description: 'Divide',
        value: null,
        visibleValue: '/',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 5,
        name: 'Seven',
        description: 'Number 7',
        value: 7,
        visibleValue: '7',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 6,
        name: 'Eight',
        description: 'Number 8',
        value: 8,
        visibleValue: '8',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 7,
        name: 'Nine',
        description: 'Number 9',
        value: 9,
        visibleValue: '9',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 8,
        name: 'Multiply',
        description: 'Multiply',
        value: null,
        visibleValue: '*',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 9,
        name: 'Four',
        description: 'Number 4',
        value: 4,
        visibleValue: '4',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 10,
        name: 'Five',
        description: 'Number 5',
        value: 5,
        visibleValue: '5',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 11,
        name: 'Six',
        description: 'Number 6',
        value: 6,
        visibleValue: '6',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 12,
        name: 'Subtract',
        description: 'Subtract',
        value: null,
        visibleValue: '-',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 13,
        name: 'One',
        description: 'Number 1',
        value: 1,
        visibleValue: '1',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 14,
        name: 'Two',
        description: 'Number 2',
        value: 2,
        visibleValue: '2',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 15,
        name: 'Three',
        description: 'Number 3',
        value: 3,
        visibleValue: '3',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 16,
        name: 'Add',
        description: 'Add',
        value: null,
        visibleValue: '+',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 17,
        name: 'Zero',
        description: 'Number 0',
        value: 0,
        visibleValue: '0',
        type: OptionTypeEnum.VALUE,
      },
      {
        id: 18,
        name: 'Decimal',
        description: 'Decimal Point',
        value: null,
        visibleValue: '.',
        type: OptionTypeEnum.OPERATION,
      },
      {
        id: 19,
        name: 'Equals',
        description: 'Equals',
        value: null,
        visibleValue: '=',
        type: OptionTypeEnum.RESULT,
      },
    ];

    return of(mockOptionCalculators).pipe(delay(1000));
  }

  getExpensesMock(): Observable<ExpensesInTheMonth[]> {
    return of(this.generateMockExpenses());
  }
}
