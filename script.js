'use strict';

// Все шесть предсказаний и их собственные памятки.
const predictions = [
  {
    answer: 'Да',
    title: 'Да ✨',
    message: 'Сама судьба говорит тебе — всё будет! Смело иди навстречу мечте.'
  },
  {
    answer: 'Нет',
    title: 'Нет 🌙',
    message: 'Не каждое закрытое окно — потеря. Возможно, звёзды берегут для тебя что-то лучшее.'
  },
  {
    answer: 'Конечно, не сомневайся!',
    title: 'Верь в себя ✨',
    message: 'Вселенная на твоей стороне. Хватит сомневаться — у тебя всё получится!'
  },
  {
    answer: 'Точно нет, даже не думай',
    title: 'Даже не думай 🌑',
    message: 'Судьба шепчет: сейчас лучше сказать этому «нет» и выбрать себя.'
  },
  {
    answer: 'Зайди попозже, спроси ещё раз',
    title: 'Возвращайся позже ⭐',
    message: 'Звёзды ещё складывают ответ. Дай событиям немного времени и попробуй снова.'
  },
  {
    answer: 'Сейчас не время знать всё',
    title: 'Всему своё время 🌌',
    message: 'Не все тайны раскрываются сразу. Доверься пути: главное станет ясно в нужный момент.'
  }
];

const ball = document.getElementById('magicBall');
const button = document.getElementById('askButton');
const symbol = document.getElementById('ballSymbol');
const answer = document.getElementById('ballAnswer');
const hint = document.getElementById('hint');
const card = document.getElementById('fortuneCard');
const cardTitle = document.getElementById('cardTitle');
const cardMessage = document.getElementById('cardMessage');
let spinning = false;
let previousIndex = -1;

// Настоящий случайный выбор. Стараемся не повторять предыдущий ответ подряд.
function choosePrediction() {
  let index = Math.floor(Math.random() * predictions.length);
  if (predictions.length > 1 && index === previousIndex) {
    index = (index + 1 + Math.floor(Math.random() * (predictions.length - 1))) % predictions.length;
  }
  previousIndex = index;
  return predictions[index];
}

function askTheBall() {
  if (spinning) return;
  spinning = true;
  const prediction = choosePrediction();

  // Сбрасываем старый результат и запускаем вращение.
  card.hidden = true;
  ball.classList.remove('has-answer', 'is-spinning');
  void ball.offsetWidth;
  answer.textContent = '';
  symbol.textContent = '✦';
  hint.textContent = 'Звёзды ищут ответ для тебя…';
  ball.classList.add('is-spinning');
  ball.disabled = true;
  button.disabled = true;
  button.textContent = '✧ Вселенная отвечает… ✧';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    ball.classList.remove('is-spinning');
    answer.textContent = prediction.answer;
    ball.classList.add('has-answer');
    cardTitle.textContent = prediction.title;
    cardMessage.textContent = prediction.message;
    card.hidden = false;
    hint.textContent = 'Предсказание готово. Хочешь задать ещё вопрос?';
    button.textContent = '✧ Спросить ещё раз ✧';
    ball.disabled = false;
    button.disabled = false;
    spinning = false;
  }, reduceMotion ? 120 : 2500);
}

ball.addEventListener('click', askTheBall);
button.addEventListener('click', askTheBall);

// Фон из звёзд создаётся прямо в браузере — изображения скачивать не нужно.
function createStars(containerId, count, minSize, maxSize) {
  const container = document.getElementById(containerId);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    const size = minSize + Math.random() * (maxSize - minSize);
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--size', `${size.toFixed(2)}px`);
    star.style.setProperty('--opacity', (0.27 + Math.random() * 0.73).toFixed(2));
    star.style.setProperty('--duration', `${(1.6 + Math.random() * 4.7).toFixed(2)}s`);
    star.style.setProperty('--delay', `${(-Math.random() * 7).toFixed(2)}s`);
    star.style.setProperty('--star-color', Math.random() > 0.76 ? '#f6deb9' : '#eff0ff');
    fragment.appendChild(star);
  }
  container.appendChild(fragment);
}

function createShootingStars() {
  const container = document.getElementById('shootingStars');
  for (let i = 0; i < 5; i++) {
    const meteor = document.createElement('span');
    meteor.className = 'shooting-star';
    meteor.style.top = `${7 + Math.random() * 64}%`;
    meteor.style.left = `${51 + Math.random() * 50}%`;
    meteor.style.setProperty('--meteor-delay', `${(-i * 3.9 - Math.random() * 2).toFixed(1)}s`);
    meteor.style.setProperty('--meteor-duration', `${(11 + Math.random() * 8).toFixed(1)}s`);
    container.appendChild(meteor);
  }
}

createStars('starsFar', 180, 0.6, 1.8);
createStars('starsNear', 65, 1.3, 3.0);
createShootingStars();
