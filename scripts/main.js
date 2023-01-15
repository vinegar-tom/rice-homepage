const app = document.querySelector('#app');

const windowSize = {
  x: window.innerWidth,
  y: window.innerHeight
};

const populateCharacter = element => {
  const glyphs = [
    'r', 'ґ', 'Я',
    'i', ';', 'ΐ',
    'c', '¢', '©',
    'e', '€', 'э'
  ];
  element.innerHTML = glyphs[Math.floor(Math.random() * glyphs.length)];
};

const changeColor = element => {
  // https://lospec.com/palette-list/slso8
  const colors = ['#203c56', '#544e68', '#8d697a', '#d08159', '#ffaa5e', '#ffd4a3'];
  element.style.color = colors[Math.floor(Math.random() * colors.length)];
};

const selectDiv = (x, y) => {
  return document.querySelector(`.c${x}.r${y}`);
};

const cascade = (element, steps) => {
  if (!element) return;

  steps += 1;

  if (!element.classList.item(0)) return;

  const target = {
    x: parseInt(element.classList.item(0).slice(1)),
    y: parseInt(element.classList.item(1).slice(1))
  }

  const aleatory = [];
  while (aleatory.length < 5) {
    aleatory.push(Math.random());
  }
  const ADJACENT_CHANCE = 0.7 / steps;

  populateCharacter(element);
  changeColor(element);

  setTimeout(() => {
    // Up, down, left, and right
    if (aleatory.shift() < ADJACENT_CHANCE) {
      cascade(selectDiv(target.x, target.y - 1), steps);
    }
    if (aleatory.shift() < ADJACENT_CHANCE) {
      cascade(selectDiv(target.x, target.y + 1), steps);
    }
    if (aleatory.shift() < ADJACENT_CHANCE) {
      cascade(selectDiv(target.x - 1, target.y), steps);
    }
    if (aleatory.shift() < ADJACENT_CHANCE) {
      cascade(selectDiv(target.x + 1, target.y), steps);
    }
  }, aleatory.shift() * 10 + steps * 20 + 20);
};

let touchTarget;

document.addEventListener('touchmove', event => {
  const newTarget = document.elementFromPoint(
    event.touches[0].pageX,
    event.touches[0].pageY
  );

  if (newTarget !== touchTarget) {
    touchTarget = newTarget;
    cascade(touchTarget, 0);
  }
});

const createDivs = () => {
  app.innerHTML = '';

  const columns = Math.floor(windowSize.x / 28);
  const rows = Math.floor(windowSize.y / 28) + 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const div = document.createElement('div');
      populateCharacter(div);
      div.className = `c${j} r${i}`;
      app.appendChild(div);

      div.addEventListener('mouseover', () => cascade(div, 0));
      div.addEventListener('touchstart', () => cascade(div, 0));
    }
  }
};

document.addEventListener('selectstart', event => event.preventDefault());

window.onresize = () => {
  windowSize.x = window.innerWidth;
  windowSize.y = window.innerHeight;
  createDivs();
}

createDivs();
