class Expense extends Data{
    
    static accountantExpenses = 0;
    
    constructor(description, value){
        super(description, value);
        this._id = ++Expense.accountantExpenses;
    }
    get id(){
        return this._id;
    }
}