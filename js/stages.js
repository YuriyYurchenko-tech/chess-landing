const leftStagesButton = document.querySelector('.stages-button_left');
const rightStagesButton = document.querySelector('.stages-button_right');
const stagesContainer = document.querySelector('.stages__list');
const stagesStepsList = document.querySelectorAll('.stages-buttons__step');

let scrollStagesIndex = 0;
let timer = null;

const changeActiveStage = (counter) => {
  stagesStepsList[scrollStagesIndex]
      .classList.remove('stages-buttons__step_disabled');
  if (stagesStepsList[scrollStagesIndex + 1]) {
    stagesStepsList[scrollStagesIndex + 1]
        .classList.add('stages-buttons__step_disabled');
  }

  if (stagesStepsList[scrollStagesIndex - 1]) {
    stagesStepsList[scrollStagesIndex - 1]
        .classList.add('stages-buttons__step_disabled');
  }
};

const controlStagesButtons = () => {
  if (scrollStagesIndex === 4) {
    disableButton(rightStagesButton);
  } else if (scrollStagesIndex === 0) {
    disableButton(leftStagesButton);
  } else {
    activateButton(rightStagesButton);
    activateButton(leftStagesButton);
  }
};

const disableButton = (button) => {
  button.classList.add('stages-button_disabled');
  button.disabled = true;
};

const activateButton = (button) => {
  if (button.classList.contains('stages-button_disabled')) {
    button.classList.remove('stages-button_disabled');
    button.disabled = false;
  }
};

const swipeContainer = (side, breakpoint) => {
  if (side === 'right') {
    stagesContainer.scrollLeft += breakpoint;
  } else {
    stagesContainer.scrollLeft -= breakpoint;
  }
};

const changeActiveStages = () => {
  [].slice.call(stagesContainer.children).forEach((item, index) => {
    if (Math.abs(
        item.getBoundingClientRect().left -
      stagesContainer.getBoundingClientRect().left,
    ) < 40) {
      scrollStagesIndex = index;
      controlStagesButtons();
      changeActiveStage(scrollStagesIndex);
      console.log(scrollStagesIndex);
    }
  });
};


stagesContainer.addEventListener('scroll', () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    clearTimeout(timer);
    changeActiveStages();
  }, 100);
});

leftStagesButton
    .addEventListener('click', () => swipeContainer('left', 400));
rightStagesButton
    .addEventListener('click', () => swipeContainer('right', 400));
