alert("Hello, I'm Bruno, welcome to my budget application, I hope you like it and find it useful!")

const incomes = [
    new Income("Salary", 2100.00),
    new Income("Car sale", 1500),
];

const expenses = [
    new Expense("Apartment rent", 900),
    new Expense("Clothes", 400)
];

let loadApp = () =>{
    loadHeader();
    loadIncomes();
    loadExpenses();
}

let totalIncomes = () =>{
    let totalIncomes = 0;
    for(let income of incomes){
        totalIncomes += income.value;
    }
    return totalIncomes;
}

let totalExpenses = () =>{
    let totalExpenses = 0;
    for(let expense of expenses){
        totalExpenses += expense.value;
    }
    return totalExpenses;
}

let loadHeader = () =>{
    let budget = totalIncomes() - totalExpenses();
    let percentExpenses = totalExpenses()/totalIncomes();
    document.getElementById("budget").innerHTML = currencyFormat(budget);
    document.getElementById("percent").innerHTML = percentFormat(percentExpenses);
    document.getElementById("incomes").innerHTML = currencyFormat(totalIncomes());
    document.getElementById("expenses").innerHTML = currencyFormat(totalExpenses());
}

const currencyFormat = (value) =>{
    return value.toLocaleString("en-US",{style:"currency", currency:"USD", minimumFractionDigits:2});
}

const percentFormat = (value) =>{
    return value.toLocaleString("en-US",{style:"percent", minimumFractionDigits:1});
}

const loadIncomes = () =>{
    let incomesHTML = "";
    for(let income of incomes){
        incomesHTML += createIncomeHTML(income);
    }
    document.getElementById("list-incomes").innerHTML = incomesHTML;
} 

const createIncomeHTML = (income) =>{
    let incomeHTML = `
    <div class="element cleanStyles">
        <div class="element_description">${income.description}</div>
        <div class="right cleanStyles">
            <div class="element_value">${currencyFormat(income.value)}</div>
            <div class="element_delete">
                <button class="element_delete--btn">
                    <ion-icon name="close-circle-outline" 
                    onclick="deleteIncome(${income.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return incomeHTML;
}

const deleteIncome = (id) =>{
    let indexDelete = incomes.findIndex(income => income.id === id);
    incomes.splice(indexDelete, 1);
    loadHeader();
    loadIncomes();
}

const loadExpenses = () =>{
    let expensesHTML = "";
    for(let expense of expenses){
        expensesHTML += createExpenseHTML(expense);
    }
    document.getElementById("list-expenses").innerHTML = expensesHTML;
}

const createExpenseHTML = (expense) =>{
    let expenseHTML = `
    <div class="element cleanStyles">
                    <div class="element_description">${expense.description}</div>
                    <div class="right cleanStyles">
                        <div class="element_value">${currencyFormat(expense.value)}</div>
                        <div class="element_percent">${percentFormat(expense.value/totalExpenses())}</div>
                        <div class="element_delete">
                            <button class="element_delete--btn">
                                <ion-icon name="close-circle-outline"
                                onclick="deleteExpense(${expense.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    `;
    return expenseHTML;
}

let deleteExpense = (id) =>{
    let indexDelete = expenses.findIndex(expense => expense.id === id);
    expenses.splice(indexDelete, 1);
    loadHeader();
    loadExpenses();
}

let addData = () => {
    let form = document.forms["form"];
    let type = form["type"];
    let description = form["description"];
    let value = form["value"];
    if(description.value !== "" && value.value !== ""){
        if(type.value === "income"){
            incomes.push(new Income(description.value, Number(value.value)));
            loadHeader();
            loadIncomes();
        }
        else if(type.value === "expense"){
            expenses.push(new Expense(description.value, Number(value.value)));
            loadHeader();
            loadExpenses();
        }
    }
}