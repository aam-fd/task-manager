import makeFilterTemplate from './make-filter';
import makeTaskCardTemplate from './make-task';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const mainFilterSection = document.querySelector(`.main__filter`);
const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

filterNames.forEach((nameFilter) => {
  const count = getRandomNumber(0, 10);
  mainFilterSection.insertAdjacentHTML(`beforeend`, makeFilterTemplate(nameFilter, count));
});

let taskCardSCount = 7; // `отрисуйте семь одинаковых карточек задач в .board__tasks`
const boardTasksSection = document.querySelector(`.board__tasks`);

const renderCards = (dist, count) => {
  const tasks = new Array(count)
    .fill()
    .map(makeTaskCardTemplate);
  dist.insertAdjacentHTML(`beforeend`, tasks.join(``));
};

renderCards(boardTasksSection, taskCardSCount);

const filterLabels = document.querySelectorAll(`.filter__label`);
[].forEach.call(filterLabels, (label) => {
  label.addEventListener(`click`, () => {

    const taskCards = document.querySelectorAll(`.card`);
    [].forEach.call(taskCards, (card) => {
      card.remove();
    });

    taskCardSCount = getRandomNumber(1, 10);
    renderCards(boardTasksSection, taskCardSCount);
  });
});
