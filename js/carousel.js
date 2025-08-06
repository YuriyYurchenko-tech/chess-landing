const leftCarouselButton = document.querySelector('.carousel-button_left');
const rightCarouselButton = document.querySelector('.carousel-button_right');
const carouselContainer = document.querySelector('.participants__list');
const carouselTextContainer = document.querySelector('.carousel-buttons__text');

let scrollCarouselCounter = 1;
let timer = null;
let autoScrollInterval = null;
let isPaused = false;

// === Функция обновления текста ===
const changeCarouselText = (counter) => {
  carouselTextContainer.textContent = counter.toString();
};

// === Контроль кнопок ===
const controlCarouselButtons = () => {
  if (scrollCarouselCounter === 6) {
    disableButton(rightCarouselButton);
  } else if (scrollCarouselCounter === 1) {
    disableButton(leftCarouselButton);
  } else {
    activateButton(rightCarouselButton);
    activateButton(leftCarouselButton);
  }
};

// === Свайп контейнера ===
const swipeContainer = (side, breakpoint) => {
  if (side === 'right') {
    carouselContainer.scrollLeft += breakpoint;
  } else {
    carouselContainer.scrollLeft -= breakpoint;
  }
};

// === Отключение кнопки ===
const disableButton = (button) => {
  button.classList.add('carousel-button_disabled');
  button.disabled = true;
};

// === Включение кнопки ===
const activateButton = (button) => {
  if (button.classList.contains('carousel-button_disabled')) {
    button.classList.remove('carousel-button_disabled');
    button.disabled = false;
  }
};

// === Определение активного элемента ===
const changeActiveCarouselItem = () => {
  [].slice.call(carouselContainer.children).forEach((item, index) => {
    if (
      Math.abs(
        item.getBoundingClientRect().left -
        carouselContainer.getBoundingClientRect().left
      ) < 40
    ) {
      scrollCarouselCounter = index + 1;
      changeCarouselText(scrollCarouselCounter);
      controlCarouselButtons();
    }
  });
};

// === Автопрокрутка каждые 4 секунды ===
const startAutoScroll = () => {
  autoScrollInterval = setInterval(() => {
    if (!isPaused) {
      if (scrollCarouselCounter < carouselContainer.children.length) {
        swipeContainer('right', 400);
        scrollCarouselCounter++;
      } else {
        carouselContainer.scrollLeft = 0;
        scrollCarouselCounter = 1;
      }
      changeCarouselText(scrollCarouselCounter);
      controlCarouselButtons();
    }
  }, 4000);
};

// === Пауза при наведении ===
carouselContainer.addEventListener('mouseenter', () => {
  isPaused = true;
});
carouselContainer.addEventListener('mouseleave', () => {
  isPaused = false;
});

// === Событие скролла (ручное листание) ===
carouselContainer.addEventListener('scroll', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    clearTimeout(timer);
    changeActiveCarouselItem();
  }, 100);
});

// === Кнопки листания ===
leftCarouselButton.addEventListener('click', () => swipeContainer('left', 400));

rightCarouselButton.addEventListener('click', () => {
  if (scrollCarouselCounter === 6) {
    carouselContainer.scrollLeft = 0; // Переход на первую
    scrollCarouselCounter = 1;
  } else {
    swipeContainer('right', 400);
    scrollCarouselCounter++;
  }
  changeCarouselText(scrollCarouselCounter);
  controlCarouselButtons();
});

// === Запуск автопрокрутки ===
startAutoScroll();


