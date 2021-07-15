window.addEventListener('DOMContentLoaded', () => {
	const btn = document.querySelector('.btn');

	// GET запросы:

	// 1. Fetch
	// 1.1 fetch
	fetch('http://localhost:3000/people')
		.then(json => json.json())
		.then(response => console.log(response));

	// Обработчик события
	btn.addEventListener('click', () => {
		fetch('http://localhost:3000/people')
		.then(json => json.json())
		.then(response => console.log(response));
	});

	// 1.2 fetch обернутый в async функцию
	const fetchRequest = async () => {
		const response = await fetch('http://localhost:3000/people');

		return await response.json();
	};

	fetchRequest().then(response => console.log(response));

	// Обработчик события
	btn.addEventListener('click', () => fetchRequest().then(response => console.log(response)));

	// 2 XMLHttpRequest
	const xmlRequest = async () => {
		const request = new XMLHttpRequest();

		request.open('GET', 'http://localhost:3000/people');
		request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
		request.send();

		request.addEventListener('load', () => {
			if (request.status === 200) {
				const response = request.response;
				const data = JSON.parse(response);
				console.log(data);

				data.forEach(({photo, name, surname, age, sex}) => {
					const card = document.createElement('div');

					card.classList.add('card');

					card.innerHTML = `
						<img src="${photo}" alt="">
						<div class="name">${name} ${surname}</div>
						<div class="sex">
							<img src="icons/${(sex === 'male') ? 'mars' : 'female'}.png" alt="male">
						</div>
						<div class="age">${age}</div>
					`;

					document.querySelector('.app').append(card);
				});
			} else {
				console.error('Ошибка запроса');
			}
		});
	};

	xmlRequest();

	// Обработчик события
	btn.addEventListener('click', xmlRequest, {once: true});
});
