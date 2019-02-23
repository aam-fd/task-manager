import getFilterTemplate from './make-filter';
import getTaskCardTemplate from './make-task';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const mainFilterSection = document.querySelector(`.main__filter`);
const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

filterNames.forEach((nameFilter) => {
  const div = document.createElement(`div`);
  const count = getRandomNumber(0, 10);

  div.innerHTML = getFilterTemplate(nameFilter, count);
  mainFilterSection.appendChild(div);
});

let taskCardSCount = 7; // `отрисуйте семь одинаковых карточек задач в .board__tasks`

const loadButton = document.querySelector(`.load-more`);
const boardTasksSection = document.querySelector(`.board__tasks`);

const renderCards = (count) => {
  for (let i = 0; i < count; i++) {

    const taskCard = document.createElement(`article`);
    taskCard.classList.add(`card`);
    taskCard.innerHTML = getTaskCardTemplate();

    boardTasksSection.insertBefore(taskCard, loadButton);
  }
};

renderCards(taskCardSCount);

const filterLabels = document.querySelectorAll(`.filter__label`);

[].forEach.call(filterLabels, (label) => {
  label.addEventListener(`click`, () => {

    const taskCards = document.querySelectorAll(`.card`);
    [].forEach.call(taskCards, (card) => {
      card.remove();
    });

    taskCardSCount = getRandomNumber(1, 10);
    renderCards(taskCardSCount);
  });
});
