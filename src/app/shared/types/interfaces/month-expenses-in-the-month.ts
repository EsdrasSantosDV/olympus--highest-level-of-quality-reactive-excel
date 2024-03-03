
export interface ExpensesInTheMonth{
    id:number;    
    monthId:number;
    monthName:string;
    expensesMonth:Expense[];
}

export interface Expense{
    expenseId:number;
    name:string;
    modalities:ModalitiesExpense[];
    expensesValues:ExpenseValue[];
}

export interface ExpenseValue{
    id:number;
    expenseId:number;
    date:Date;
    value:number | null;
    modalityId:number;
}

export interface ModalitiesExpense{
    id:number;
    name:string;
    enabled:boolean;
}
