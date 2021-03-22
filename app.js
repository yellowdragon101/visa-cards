let cards = [];

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function spreadsheet() {
	const card = document.getElementById("card").value;
	const amount = parseFloat(document.getElementById("amount").value);

	let output = document.getElementById("output");
	if(card == "" || amount== "") {
		output.textContent = "Fill out both fields.";
		return;
	}
	output.textContent = "";

	for(i in cards) {
		if(card == cards[i][0]) {
			cards[i][1] = amount;
			fillTable();
			return;
		}
	}
	cards.push([card, amount]);
	fillTable();
}

function fillTable() {
	cards.sort(function(a,b) {
		return a[1]+b[1]
	});

	document.getElementById("tbody").innerHTML = "";
	let total = 0;
	for(i in cards) {
		addCard(cards[i][0], formatter.format(cards[i][1]));
		total += cards[i][1];
		console.log(cards[i][1], formatter.format(cards[i][1]))
	}
	total = formatter.format(total);
	document.getElementById("total").textContent = total;
}

function addCard(card, amount) {
	const table = document.getElementById("tbody");
	const row = table.insertRow();
	const cell = row.insertCell();
	const cell2 = row.insertCell();
	const cardTxt = document.createTextNode(card);
	const amountTxt = document.createTextNode(amount);
	cell.appendChild(cardTxt);
	cell2.appendChild(amountTxt);
}

document.addEventListener('keypress', function(e) {
	if(e.keyCode === 13) {
		spreadsheet();
	}
});