$(document).ready(() => {

//Show user's previous operations based on local Storage
if(localStorage.getItem('transactions') !== null) {
showPrevData();
}

//Btn Event
$('#addBtn').on('click', validateForm);


//Add new transaction
function transactionAdd() {

//Check if Operation is + or -
operationType();

//Append New Transaction
$('.append').append(`<div class="addElem ${operationType()[0]}" style="${operationType()[1]}">
<span class="x d-none">X</span>
<span class="operation">${$('.textInput').val()}</span>
<span class="operationAmount"><span>${operationType()[0] == 'plus' ? '+' : ''}</span>${$('.amountInput').val()}</span>
</div>`);

//Remove Item Event
$('.x').on('click', removeItem);


// Hide/Show Delete Button
$('.addElem').hover(function() {
$(this).find('.x').removeClass('d-none');
}, function() {
$(this).find('.x').addClass('d-none');
});


// Push Items to Local Storage
pushToLocal($('.textInput').val(), $('.amountInput').val(), operationType()[1], operationType()[0] == 'plus' ? '+' : '');

// Clear Input Fields
$('.textInput').val('');
$('.amountInput').val('');

//Update Stats
calculations();
}


// Calculations
function calculations() {
  showIncome();
  showExpenses();
  showBalance();
}

// Show Total Income
function showIncome() {
let arr = JSON.parse(localStorage.getItem('transactions'));
let income = 0;
arr.forEach(e => {
if(e.sign == '+') {
income += parseInt(e.amount);
}
});
$('.income').text(income);
}

// Show Total Expenses
function showExpenses() {
  let arr = JSON.parse(localStorage.getItem('transactions'));
  let expenses = 0;
  arr.forEach(e => {
  if(e.sign == '') {
  expenses += parseInt(e.amount);
  }
  });
  $('.expenses').text(expenses);
}

// Show Total balance
function showBalance() {
$('.balance').text(parseInt($('.income').text()) + parseInt($('.expenses').text()));
}


//Display items stored locally
function showPrevData() {
let arr = JSON.parse(localStorage.getItem('transactions')) || [];
arr.forEach(e => {
  $('.append').append(`<div class="addElem ${operationType()[0]}" style="${e.style}" id="${e.id}">
  <span class="x d-none">X</span>
  <span class="operation">${e.text}</span>
  <span class="operationAmount"><span>${e.sign}</span>${e.amount}</span>
  </div>`);
});

calculations();

//Remove Item Event
$('.x').on('click', removeItem);

// Hide/Show Delete Button
$('.addElem').hover(function() {
$(this).find('.x').removeClass('d-none');
}, function() {
$(this).find('.x').addClass('d-none');
});


}

//Remove Transaction from UI and local storage
function removeItem() {
let id = $(this).parent().attr('id');
let arr = JSON.parse(localStorage.getItem('transactions'));
arr.forEach((e, i) => {
if(id == e.id) {
arr.splice(i, 1);
}
});
// Push new array to local storage
localStorage.setItem('transactions', JSON.stringify(arr));
// Clean History Field
$('.append').empty();
// Update UI
showPrevData();
}

// Check if Expenses or Income
function operationType() {
if($('.amountInput').val() > 0) {
  return ['plus', 'border-right: 5px solid rgb(58, 247, 20)'];
} else {
  return ['minus', 'border-right: 5px solid rgb(209, 56, 16)'];
}
}


// Pushing Object to local storage
function pushToLocal(text, amount, style, sign) {
let arr = JSON.parse(localStorage.getItem('transactions')) || []; //If local storage is empty make it array
arr.push({'id' : generateId(1, 9999999).toFixed(), 'text' : text, 'amount' : amount, 'style' : style, 'sign' : sign});
localStorage.setItem('transactions', JSON.stringify(arr));
}

// Generate Item ID
function generateId(min, max) {
  return Math.random() * (max - min) + min;
}


//Check that all fields are filled
function validateForm() {
  if($('.textInput').val() == '' && $('.amountInput').val() == '') {
  alert('Fields Cannot Be Empty!');
  }

  //If One of the fields is empty - Error
  else if($('.textInput').val() == '' || $('.amountInput').val() == '') {
  alert('One Field Is Empty!');
  }

  //If url != regex - Error
  else {
  transactionAdd();
  }
}































})
