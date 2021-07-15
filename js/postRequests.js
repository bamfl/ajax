window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn.send'),
				form = document.querySelector('form');

  // POST запросы:

  // 1. Fetch
  // 1.1 fetch
  // fetch('http://localhost:3000/people', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-type': 'application/json; charset=UTF-8',
	// 	},
	// 	body: JSON.stringify({
	// 		name: 'Dima',
	// 		age: 27,
	// 		id: (Math.random() * 10).toFixed(0)
	// 	})	
	// })
  //   .then((json) => json.json())
  //   .then((response) => console.log(response));

  // // Обработчик события
  btn.addEventListener('click', () => {
		fetch('http://localhost:3000/people', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({
			name: 'Dima',
			age: 27,
			id: (Math.random() * 10).toFixed(0)
		})	
	})
    .then((json) => json.json())
    .then((response) => console.log(response));
  });

  // 1.2 fetch обернутый в async функцию

	// fetchRequest на JSON сервер
  const fetchRequestJSON = async (url, data) => {
    const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(data)
		});

    if (!response.ok) {
      throw new Error(`Can not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };  

	// fetchRequest на php сервер
  const fetchRequestPHP = async (url, data) => {
    const response = await fetch(url, {
			method: 'POST',
			body: data
		});

    if (!response.ok) {
      throw new Error(`Can not fetch ${url}, status: ${response.status}`);
    }

    return await response.text(); // Для php сервера
  };

  // Обработчик события
  btn.addEventListener('click', () => {
		fetchRequestJSON('http://localhost:3000/people', {
			name: 'Dima',
			age: 27,
			id: (Math.random() * 10).toFixed(0)
		})
		.then((response) => console.log(response));
	});

	// Отправка формы на JSON сервер
	const fetchSendFormJSON = (form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const data = Object.fromEntries(formData.entries());
			data.id = (Math.random() * 10).toFixed(0);

			fetchRequestJSON('http://localhost:3000/people', data)
				.then((response) => console.log(response));
		});
	};

	fetchSendFormJSON(form);

	// Отправка формы на php сервер
	const fetchSendFormPHP = (form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);

			fetchRequestPHP('../server.php', formData)
				.then((response) => console.log(response));
		});
	};

	fetchSendFormPHP(form);

  // 2 XMLHttpRequest

	// XMLHttpRequest на JSON сервер
  const xmlRequestJSON = async (url, data) => {
    const request = new XMLHttpRequest();

    request.open('POST', url);
    request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(data));

    request.addEventListener('load', () => {
      if (request.status === 201) {
        const response = request.response;
        const data = JSON.parse(response);
        console.log(data);
      } else {
        console.error('Ошибка запроса');
      }
    });
  };
	
	// XMLHttpRequest на php сервер
  const xmlRequestPHP = async (url, data) => {
    const request = new XMLHttpRequest();

    request.open('POST', url);
    request.send(data);

    request.addEventListener('load', () => {
      if (request.status === 200) {
        const response = request.response;
        console.log(response);
      } else {
        console.error('Ошибка запроса');
      }
    });
  };

  // Обработчик события
  btn.addEventListener('click', () => xmlRequest('http://localhost:3000/people', {
		name: 'Dima',
		age: 27,
		id: (Math.random() * 10).toFixed(0)
	}), { once: true });

	// Отправка формы на JSON сервер
	const xmlSendFormJSON = (form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const data = Object.fromEntries(formData.entries());
			data.id = (Math.random() * 10).toFixed(0);

			xmlRequestJSON('http://localhost:3000/people', data);
		});
	};

	xmlSendFormJSON(form);

	// Отправка формы на php сервер
	const xmlSendFormPHP = (form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);

			xmlRequestPHP('../server.php', formData);
		});
	};

	xmlSendFormPHP(form);

  // 3. Библиотека axios - нужно подключить(cdn, npm в bundle)
  // 3.1 axios через CDN
  // axios
  //   .post('http://localhost:3000/people', {
	// 		name: 'Dima',
	// 		age: 27,
	// 		id: (Math.random() * 10).toFixed(0)
	// 	})
  //   .then((response) => console.log(response.data))
  //   .catch((error) => console.log(error));

  // 3.2 axios через CDN обернутый в async функцию
  async function axiosPost(url, data) {
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

	btn.addEventListener('click', () => axiosPost('http://localhost:3000/people', {
		name: 'Dima',	
		age: 27,
		id: (Math.random() * 10).toFixed(0)
	}));

	// Отправка формы на JSON сервер
	const axiosSendFormJSON = (form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);
			const data = Object.fromEntries(formData.entries());
			data.id = (Math.random() * 10).toFixed(0);

			axiosPost('http://localhost:3000/people', data);
		});
	};

	axiosSendFormJSON(form);

	// Отправка формы на php сервер
	const axiosSendFormPHP = (form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const formData = new FormData(form);

			axiosPost('../server.php', formData);
		});
	};

	axiosSendFormPHP(form);
});
