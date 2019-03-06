import makeFilterTemplate from './make-filter';
import makeTaskCardTemplate from './make-task';
import {getRandomNumber} from './utils';
import {taskData} from './mock';

// отрисовка всех фильтров

const mainFilterSection = document.querySelector(`.main__filter`);
const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

filterNames.forEach((nameFilter) => {
  const count = getRandomNumber(0, 10);
  mainFilterSection.insertAdjacentHTML(`beforeend`, makeFilterTemplate(nameFilter, count));
});

// отрисовка всех карточек задач

let taskCardSCount = 7; // `отрисуйте семь одинаковых карточек задач в .board__tasks`
const boardTasksSection = document.querySelector(`.board__tasks`);

const renderCards = (dist, count) => {
  const tasks = new Array(count)
    .fill()
    .map(makeTaskCardTemplate(taskData));
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
