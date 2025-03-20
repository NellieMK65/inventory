// JSON is a string that js can automatically convert to an object
// synchronous js ->
// Asynchronous js ->

document.addEventListener('DOMContentLoaded', () => {
	// it only runs once when the page is rendered
	getItems();
});

function getItems() {
	const options = {
		method: 'GET',
		headers: {
			Accept: '*/*',
		},
	};

	fetch('http://localhost:3000/items?deleted=false', options)
		// the first process when getting response from the server is to convert to JSON
		// JSON is just a string that JS can automatically convert to objects
		.then((response) => response.json())
		// now we get access to the retrieved data
		.then(renderItems)
		.catch((err) => console.error(err));
}

function renderItems(items) {
	const itemListDiv = document.getElementById('item-list');

	// remove initial displayed list
	itemListDiv.innerHTML = '';

	// this is an array of items that we can iterate over
	items.forEach((item) => {
		console.log(item);
		// a single item item at this point is an object
		// 1. create a div element
		const itemContainer = document.createElement('div');
		// itemContainer.textContent = item.name;
		itemContainer.classList.add('card', 'item');

		const img = document.createElement('img');
		img.classList.add('card-img-top');
		img.src = item.image;
		img.alt = item.name;
		// img.width = '100%';
		img.height = '200';
		itemContainer.appendChild(img);

		const contentDiv = document.createElement('div');
		contentDiv.classList.add('card-body');

		const name = document.createElement('h2');
		name.classList.add('card-title');
		name.textContent = item.name;
		contentDiv.appendChild(name);

		const price = document.createElement('p');
		price.classList.add('card-text');
		// We can use some built api helpers to format our work better
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
		const formattedPrice = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'KES',
		}).format(item.price);
		price.textContent = formattedPrice;
		contentDiv.appendChild(price);

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('btn', 'btn-danger');
		deleteButton.textContent = 'Delete item';
		deleteButton.addEventListener('click', () => {
			console.log(`Item with id ${item.id} clicked`);
			// call the function with the delete logic
			deleteItem(item.id);
		});
		contentDiv.appendChild(deleteButton);

		itemContainer.appendChild(contentDiv);

		itemListDiv.appendChild(itemContainer);
	});
}

// POST -> create item
const itemForm = document.getElementById('item-form');
// attach the submit event listener
itemForm.addEventListener('submit', (e) => {
	// prevent default form behaviour
	e.preventDefault();

	// use FormData to extract all input with key/value pair
	// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
	const formData = new FormData(itemForm);
	const data = Object.fromEntries(formData);

	// make POST request through fetch
	fetch('http://localhost:3000/items', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then((response) => response.json())
		.then(() => {
			// item created successfully
			// 1. Reset the form
			itemForm.reset();

			// 2. Refetch items from server
			getItems();
		})
		.catch((err) => console.error(err));
});

function deleteItem(itemId) {
	const options = {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};

	fetch(`http://localhost:3000/items/${itemId}`, options)
		.then((response) => response.json())
		.then(() => {
			// if the delete operation is ok, all we need to do is
			// refetch the items
			getItems();
		})
		.catch((err) => console.error(err));
}
