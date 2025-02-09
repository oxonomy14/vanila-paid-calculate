// let users = []; // Глобальная переменная

// fetch('public/users.json')
//   .then(response => response.json())
//   .then(data => {
//     users = data; // Записываем загруженные данные
//     console.log('Данные загружены:', users);
//   })
//   .catch(error => console.error('Ошибка загрузки JSON:', error));

const users = [
  {
    username: 'Анатолий Анатолич',
    email: 'test@gmail.com',
    price: '1600',
    titleCourse: 'учебная сессия',
    opt: '3',
    priceOpt: '1200',
    teacher: 'Екатерина Ярская',
  },
  {
    username: 'Яна Яламова',
    email: 'yasmina75713@gmail.com',
    price: '1600',
    titleCourse: 'учебная сессия',
    opt: '3',
    priceOpt: '1200',
    teacher: 'Екатерина Ярская',
  },
  {
    username: 'Инна Козлова',
    email: 'mary-bizness06@mail.ru',
    price: '3000',
    titleCourse: 'психоанализ',
    opt: '',
    priceOpt: '',
    teacher: 'Павел Дементьев',
  },
  {
    username: 'Анастасия Чиверда',
    email: 'n-chiverda@mail.ru',
    price: '2500',
    titleCourse: 'психоанализ',
    opt: '',
    priceOpt: '',
    teacher: 'Павел Дементьев',
  },
  {
    username: 'Татьяна Левашова',
    email: 'tanyafedotova2601@yandex.ru',
    price: '2500',
    titleCourse: 'психоанализ',
    opt: '',
    priceOpt: '',
    teacher: 'Павел Дементьев',
  },
];

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  container: document.querySelector('.feedback-message'),
  title: document.querySelector('.sub-title'),
  result: document.querySelector('.text-1'),
  text2: document.querySelector('.text-2'),
  text3: document.querySelector('.text-3'),
};

const formData = {
  email: '',
  message: '',
};

//! Парсим xml обменника

let exchangeRate = null; // Глобальная переменная

fetch('http://localhost:3000/proxy/exprates')
  .then(response => response.text())
  .then(xmlText => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const fromCurrency = 'WIRETHB';
    const toCurrency = 'SBERRUB';

    const exchangeNode = Array.from(xmlDoc.querySelectorAll('item')).find(
      item =>
        item.querySelector('from').textContent === fromCurrency &&
        item.querySelector('to').textContent === toCurrency
    );

    if (exchangeNode) {
      exchangeRate = exchangeNode.querySelector('out').textContent;
      console.log(`Курс ${fromCurrency} → ${toCurrency}: ${exchangeRate}`);
    } else {
      console.log('Курс не найден');
    }
  })
  .catch(error => console.error('Ошибка загрузки XML:', error));

// Можно использовать exchangeRate в других частях кода
// setTimeout(() => {
//   console.log('Доступ к курсу через 2 секунды:', exchangeRate);
// }, 200);

//! Сохраняем значения в localStorage

refs.form.addEventListener('input', e => {
  // console.log(e.currentTargettarget);
  const email = e.currentTarget.elements.email.value; // currentTarget - элемент на котором происходит событие
  // const message = e.currentTarget.elements.message.value;
  //console.log(email, message);
  const formData = { email }; // создаем обьект и кладем значение
  //console.log(formData);
  saveToLS(STORAGE_KEY, formData);
});

initPage(); //!  Загружаем данные из localStorage

function initPage() {
  const formData = loadFromLS(STORAGE_KEY);
  refs.form.elements.email.value = formData?.email || ''; // ? - если нет значения и не надо брать
  //refs.form.elements.message.value = formData?.message || '';
}

//! Текущая дата

const today = new Date(); // Текущая дата
const day = String(today.getDate()).padStart(2, '0'); // День с ведущим нулем
const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяц (январь = 0)
const year = today.getFullYear(); // Год

const formattedDate = `${day}.${month}.${year}`; // Форматируем дату
console.log(formattedDate); // Например: 02.02.2024

//!  submit - выводим информацию

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  if (!e.currentTarget.elements.email.value) {
    alert('Заполните поле Email для идентификации Вас');
    return;
  }
  const email = e.currentTarget.elements.email.value.trim().toLowerCase(); // Получаем email и нормализуем
  //const message = e.currentTarget.elements.message.value;

  //localStorage.removeItem(STORAGE_KEY); // очищаем LocalStorage

  const user = users.find(user => user.email.toLowerCase() === email);

  if (user) {
    refs.title.textContent = `${user.username}, ${user.titleCourse}`;
    refs.result.textContent = `Стоимость сессии ${
      user.price
    } Бат, что на сегодня ${formattedDate} по текущему курсу vipChanger 1 Бат = ${exchangeRate} руб. составляет: ${Math.floor(
      user.price * exchangeRate
    )} руб.`;
    refs.text3.textContent = `Куратор: ${user.teacher}`;

    console.log(user.opt);

    if (user.opt !== '') {
      refs.text2.textContent = `Стоимость ${
        user.opt
      }-x занятий составит - ${Math.floor(
        user.priceOpt * exchangeRate * user.opt
      )} руб.`;
    } else {
      refs.text2.textContent = ``;
    }
  } else {
    refs.result.textContent = 'Такой электронной почты нет в списке';
  }

  refs.form.reset();
});

//! функция для LocalStorage

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}
