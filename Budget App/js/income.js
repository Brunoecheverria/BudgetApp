class Income extends Data{
    
    static accountantIncomes = 0;
    
    constructor(description, value){
        super(description, value);
        this._id = ++Income.accountantIncomes;
    }
    get id(){
        return this._id;
    }
}