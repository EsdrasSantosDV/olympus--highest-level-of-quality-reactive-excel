
export interface ExpensesInTheMonth{
    monthId:number;
    monthName:string;
    expensesMonth:Expense;
}

export interface Expense{
    expenseId:number;
    name:string;
    modalities:ModalitiesExpense[];
    expensesValues:ExpenseValue[];
}

export interface ExpenseValue{
    id:number;
    comments?:string;
    expenseId:number;
    date:Date;
    value:number;
    modalityId:number;
}

export interface ModalitiesExpense{
    id:number;
    name:string;
    enabled:boolean;
}
