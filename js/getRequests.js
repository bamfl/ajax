window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn');

  const createCards = (response) => {
    response.forEach(({ photo, name, surname, age, sex }) => {
      const card = document.createElement('div');

      card.classList.add('card');

      card.innerHTML = `
				<img src="${photo}" alt="">
				<div class="name">${name} ${surname}</div>
				<div class="sex">
					<img src="icons/${sex === 'male' ? 'mars' : 'female'}.png" alt="male">
				</div>
				<div class="age">${age}</div>
			`;

      document.querySelector('.app').append(card);
    });
  };

  // GET запросы:

  // 1. Fetch
  // 1.1 fetch
  fetch('http://localhost:3000/people')
    .then((json) => json.json())
    // .then(response => createCards(response))
    .then((response) => console.log(response))
    .catch((err) => console.err(err));

  // Обработчик события
  btn.addEventListener('click', () => {
    fetch('http://localhost:3000/people')
      .then((json) => json.json())
      .then((response) => console.log(response));
  });

  // 1.2 fetch обернутый в async функцию
  const fetchRequest = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Can not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  };

  fetchRequest('http://localhost:3000/people').then((response) => console.log(response));

  // Обработчик события
  btn.addEventListener('click', () => fetchRequest().then((response) => console.log(response)));

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

        createCards(data);
      } else {
        console.error('Ошибка запроса');
      }
    });
  };

  xmlRequest();

  // Обработчик события
  btn.addEventListener('click', xmlRequest, { once: true });

  // 3. Библиотека axios - нужно подключить(cdn, npm в bundle)
  // 3.1 axios через CDN
  axios
    .get('http://localhost:3000/people')
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));

  // 3.2 axios через CDN обернутый в async функцию
  async function axiosGet(url) {
    try {
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  axiosGet('http://localhost:3000/people');
});
