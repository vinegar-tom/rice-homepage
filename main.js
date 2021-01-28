const windowSize = {
  x: window.innerWidth,
  y: window.innerHeight,
  columns: undefined,
  rows: undefined
};

let titleOpacity = 0;

const app = document.querySelector('#app');
const title = document.querySelector('#title');

let touchTarget;

document.addEventListener('touchmove', event => {
  const newTarget = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);

  if (newTarget !== touchTarget) {
    touchTarget = newTarget;
    cascade(touchTarget, 0);
  }
});

function createDivs() {
  app.innerHTML = '';

  windowSize.columns = Math.floor(windowSize.x / 28);
  windowSize.rows = Math.floor(windowSize.y / 28) + 1;

  for (let i = 0; i < windowSize.rows; i++) {
    for (let j = 0; j < windowSize.columns; j++) {
      const div = document.createElement('div');
      populateCharacter(div);
      div.className = `c${j} r${i}`;
      div.addEventListener('mouseover', () => {
        cascade(div, 0);
        transformTitle();
      });
      div.addEventListener('touchstart', event => {
        cascade(div, 0);
        transformTitle();
      });
      app.appendChild(div);
    }
  }
}

function populateCharacter(element) {
  const glyphs = ['a', 'r', 'f', 'B', '0', 'l', '3', '8', '{', '=', 'Њ', '@', 'Ξ', '-'];
  element.innerHTML = glyphs[Math.floor(Math.random() * glyphs.length)];
}

function changeColor(element) {
  // https://lospec.com/palette-list/slso8
  const colors = ['#203c56', '#544e68', '#8d697a', '#d08159', '#ffaa5e', '#ffd4a3', '#ffecd6']
  element.style.color = colors[Math.floor(Math.random() * colors.length)];
}

function selectDiv(x, y) {
  return document.querySelector(`.c${x}.r${y}`);
}

function cascade(element, steps) {
  if (!element) return;

  steps += 1;
  if (steps >= 6) return;

  const target = {
    x: parseInt(element.classList.item(0).slice(1)),
    y: parseInt(element.classList.item(1).slice(1))
  }

  let aleatory = [];
  while (aleatory.length < 9) {
    aleatory.push(Math.random());
  }
  const ADJACENT_CHANCE = 0.2;
  const DIAGONAL_CHANCE = ADJACENT_CHANCE / 1.414;

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

    // Diagonals
    if (aleatory.shift() < DIAGONAL_CHANCE) {
      cascade(selectDiv(target.x - 1, target.y - 1), steps);
    }
    if (aleatory.shift() < DIAGONAL_CHANCE) {
      cascade(selectDiv(target.x + 1, target.y - 1), steps);
    }
    if (aleatory.shift() < DIAGONAL_CHANCE) {
      cascade(selectDiv(target.x + 1, target.y + 1), steps);
    }
    if (aleatory.shift() < DIAGONAL_CHANCE) {
      cascade(selectDiv(target.x - 1, target.y + 1), steps);
    }
  }, aleatory.shift() * 100 + steps * 30 + 100);
}

function transformTitle() {
  if (titleOpacity < 0.1) {
    titleOpacity += 0.0002;
    title.style.opacity = titleOpacity;
  } else if (titleOpacity < 0.5) {
    titleOpacity += 0.001;
    title.style.opacity = titleOpacity;
  } else if (titleOpacity < 1) {
    titleOpacity += 0.002;
    title.style.opacity = titleOpacity;
  }

  if (Math.random() < 0.1) changeColor(title);
}

window.onresize = () => {
  windowSize.x = window.innerWidth;
  windowSize.y = window.innerHeight;
  createDivs();
}

createDivs();
