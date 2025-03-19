// fetch('http://localhost:3000/items', {
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// })
// 	.then((res) => res.json())
// 	.then((data) => {
// 		console.log(data);
// 	});

// JSON is a string that js can automatically convert to an object
// synchronous js ->
// Asynchronous js ->

const options = {
	method: 'GET',
	headers: {
		Accept: '*/*',
	},
};

fetch('http://localhost:3000/items', options)
	.then((response) => response.json())
	.then(renderItems)
	.catch((err) => console.error(err));

function renderItems(items) {
	const itemListDiv = document.getElementById('item-list');

	// remove initial displayed list
	itemListDiv.innerHTML = '';

	// this is an array of items that we can iterate over
	items.forEach((item) => {
		// a single item item at this point is an object
		// 1. create a div element
		const itemContainer = document.createElement('div');
		itemContainer.textContent = item.name;

		itemListDiv.appendChild(itemContainer);
	});
}
