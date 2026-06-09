const epi = document.querySelector('.epigraph > p');

let shadowStr = '';
const numShadows = 24;
const distance = 140;

for (let i = 0; i < numShadows; i++) {
  let shadow = 'rgb(from var(--white) r g b / 0.1)';
  for (let j = 0; j < 2; j++) {
    const randFloat = Math.random() * distance * 2 - distance;
    shadow += ` ${randFloat}px`;
  }

  if (i < numShadows - 1) { shadow += ',' };
  shadowStr += shadow;
}

epi.style.textShadow = shadowStr;