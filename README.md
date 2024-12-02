# Budget Tracker Project Documentation

## Project Goals
The **Budget Tracker** is designed to simplify personal finance management by enabling users to:
- Add income and expenses.
- Filter and sort transactions.
- View and maintain an updated balance.

---

## Main Features
- **Balance Display**: Displays the current balance, dynamically updated when transactions are added or deleted.
- **Adding Entries**: Users can input transactions with descriptions and amounts.
- **Deleting Entries**: Transactions can be removed, and the balance updates accordingly.
- **Filtering and Sorting**: Transactions can be filtered by type (income or expenses) and sorted by amount.

---

## Using JavaScript

### **Data Storage: Arrays and Objects**
Transactions are stored in an array of objects with the following structure:
```javascript
{ id: 1, description: 'Salary', cash: 15000 }
```
### Updating the Balance:
```javascript
function counterBalance(amountOfCash) {
    currentCash += amountOfCash;
    document.getElementById('balance').innerText = `${currentCash}₸`;
}
```
### Adding a Div:
```javascript
function createDivOfHistory(id, description, cash) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<p>${description}</p><p>${cash}₸</p>`;
    document.getElementById('history').prepend(newDiv);
}
```
### Adding a New Entry:
```javascript
function creatingOneElementOfHistory(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const cash = parseFloat(document.getElementById('amount').value);
    history.push({ id: counterId++, description, cash });
    createDivOfHistory(counterId, description, cash);
    counterBalance(cash);
}
```
### Sorting and Filtering:
Filtering entries is done using:
```javascript
function filterOnlyIncome() {
    const filter = history.filter(record => record.cash > 0);
    displayRecords(filter);
}
```
### Delete Entry:
```javascript
function deleteEntry(event) {
	const id = event.target.closest('.history').id;
	const index = history.findIndex(item => item.id === parseInt(id));
	const removedItem = history.splice(index, 1)[0];

	event.target.closest('.history').remove();
	counterBalance(-removedItem.cash);
	console.info('deleteEntry() работает');
}
```
## Usage Example

1. **Add an Entry**:  
   Input income or expense details (description and amount) and submit the form to update your transaction history and balance.

2. **Apply Filters**:  
   Use filters to display only **income** or **expenses**, or sort transactions by amount for better organization.

3. **Delete an Entry**:  
   Click the delete button next to a transaction to remove it from the history and see the balance update accordingly.

---

This project simplifies personal finance management with intuitive JavaScript functions, making it easy to track and control your finances efficiently.
