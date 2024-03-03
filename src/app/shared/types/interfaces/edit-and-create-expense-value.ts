export interface EditAndCreateExpenseValue{
    id?:number;
    value:number | null;
    modalityId:number;
    expenseId:number;
    idTable:number;
    day:Date;
    isEdit:boolean;
}

