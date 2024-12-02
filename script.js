// ! Контейнер где расположены история добавления отчетов
const place = document.getElementById('historyOfBalance');

const history = [
	{ id: 1, description: 'Зарплата', cash: 15000 },
	{ id: 2, description: 'Магазин', cash: -3000 },
	{ id: 3, description: 'Кафе', cash: -500 },
	{ id: 4, description: 'Премия', cash: 5000 }
];

// ! Копирование массива с историей
const originalHistory = [...history];
 





// ! Конструктор нового контейнера для расположение внтури place
function createDivOfHistory(id, description, cash){
	const newDiv = document.createElement("div");

	newDiv.id = id;
	cash >= 0 ? newDiv.classList.add('history', 'plus') : newDiv.classList.add('history', 'minus');

	const textDescription = document.createElement('p');
	const textCash = document.createElement('p');
	const deleteButton = document.createElement('div');

	textDescription.className = 'firstP';
	textCash.className = 'secondP';
	deleteButton.className = 'deleteButton';

	textDescription.textContent = description;
	textCash.textContent = `${cash}₸`;
	deleteButton.innerHTML = '<img src="./delete.png" alt="Delete">';
	deleteButton.addEventListener('click', deleteEntry);

	newDiv.appendChild(textDescription);
	newDiv.appendChild(textCash);
	newDiv.appendChild(deleteButton);

	place.prepend(newDiv);
}





// ! Счетчик баланса
let currentCash = 0;
let boolean = true;
function counterBalance(amountOfCash){
	const placeForBalance = document.getElementById('balance');
	
	currentCash += amountOfCash;

	placeForBalance.innerText = `${currentCash}₸`;

	if(currentCash >= 0){
		placeForBalance.style.color = 'green';
		boolean = true;
	}
	else{
		placeForBalance.style.color = 'red';
		if(boolean){
			alert('Пора экономить. У вас баланс в минусе.');
			boolean = false;
		}
	}

	console.info('counterBalance(amountOfCash) работает');
}






// ! Для отображения массива путем передачи во внутрь place
function watch(array){
	place.innerHTML = '';
	let cashAfterLoop = 0;

	array.forEach(element => {
		createDivOfHistory(element.id, element.description, element.cash);
		cashAfterLoop += element.cash;
	});

	counterBalance(cashAfterLoop - currentCash);
	console.info('watchBalance() работает');
}






// ! Получение input-ов а также отправление их в массив и вызов функций counterBalance
let counterOfId = history[history.length - 1].id + 1;
function creatingOneElementOfHistory(event){
	event.preventDefault();

	const description = document.getElementById('descriptionOfBalance').value.trim();
	const cash = parseFloat(document.getElementById('amountOfCash').value.trim());

	if(cash > 99999999999999999 || cash < -99999999999999999 || cash == 0){
		alert("Введите корректную сумму");
		return;
	}

	createDivOfHistory(counterOfId, description, cash);

	history.push({id: counterOfId, description, cash});
	originalHistory.push({id: counterOfId, description, cash});

	document.getElementById('descriptionOfBalance').value = '';
	document.getElementById('amountOfCash').value = '';

	counterOfId++;
	counterBalance(cash);
	console.info('creatingOneElementOfHistory(event) работает');
}






// ! Функция удаления записи который срабатывает при нажатий кнопки
function deleteEntry(event) {
	const id = event.target.closest('.history').id;
	const index = history.findIndex(item => item.id === parseInt(id));
	const removedItem = history.splice(index, 1)[0];

	event.target.closest('.history').remove();
	counterBalance(-removedItem.cash);
	console.info('deleteEntry() работает');
}






// ! Фильтр только по доходам
function filterOnlyIncome(){
	let filter = history.filter(element => element.cash > 0);
	document.getElementById('textBalance').innerText = 'Ваш доход:';
	if(boolean) boolean = false;
	watch(filter);
	console.info('filterOnlyIncome() работает');
}






// ! Фильтр только по расходам
function filterOnlyExpense(){
	let filter = history.filter(element => element.cash < 0);
	document.getElementById('textBalance').innerText = 'Ваш расход:';
	if(boolean) boolean = false;
	watch(filter);
	boolean = true;
	console.info('filterOnlyExpense() работает');
}






// ! Фильтр по возрастанию и наоборот
let flag = true;
function filterByIncreaseAndDecrease(){
	if(flag){
		let filter = history.sort((a, b) => a.cash - b.cash);
		if(boolean) boolean = false;
		watch(filter);
		document.getElementById('buttonSortByIncrease').innerText = 'По убыванию';
		flag = false;
	}
	else{
		let filter = history.sort((a, b) => b.cash - a.cash);
 		if(boolean) boolean = false;
		watch(filter);
		document.getElementById('buttonSortByIncrease').innerText = 'По возрастанию';
		flag = true;
	}
	document.getElementById('textBalance'). innerText = 'Ваш нынешний баланс:';
	console.info('filterByIncreaseAndDecrease() работает');
}






// ! Сбросить
function reset(){
	if(boolean) boolean = false;
	watch(originalHistory);
	document.getElementById('buttonSortByIncrease').innerText = 'По возрастанию';
	document.getElementById('textBalance'). innerText = 'Ваш нынешний баланс:';
	console.info('reset() работает');
}







document.addEventListener('DOMContentLoaded', watch(originalHistory));