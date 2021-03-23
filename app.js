let cards = [];

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function spreadsheet() {
	const card = document.getElementById("card").value;
	const amount = parseFloat(document.getElementById("amount").value);

	console.log(document.getElementById("amount").value, amount);
	
	const output = document.getElementById("output");
	if(card != "" && (!isNaN(amount) || amount == 0)) {
		if(!output.classList.contains("hidden")) output.classList.add("hidden");
		for(i in cards) {
			if(card == cards[i][0]) {
				cards[i][1] = amount;
				populateTable();
				return;
			}
		}
		cards.push([card, amount]);
		populateTable();
	}
	else {
		output.classList.remove("hidden");
		return;
	}
}

function populateTable() {
	cards.sort(function(a,b) {
		return b[1]-a[1]
	});

	document.getElementById("tbody").innerHTML = "";
	let total = 0;
	for(i in cards) {
		addCell(cards[i][0], formatter.format(cards[i][1]));
		total += cards[i][1];
	}
	total = formatter.format(total);
	document.getElementById("total").textContent = total;
}

function addCell(card, amount) {
	const table = document.getElementById("tbody");
	const row = table.insertRow();
	const cell = row.insertCell();
	const cardTxt = document.createTextNode(card);
	cell.appendChild(cardTxt);
	const cell2 = row.insertCell();
	const amountTxt = document.createTextNode(amount);
	cell2.appendChild(amountTxt);
}

document.addEventListener('keypress', function(e) {
	if(e.keyCode === 13) {
		spreadsheet();
	}
});