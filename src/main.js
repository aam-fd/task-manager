import makeFilterTemplate from './make-filter';
import {getRandomNumber} from './utils';
import {makeTasksData} from './mock';
import {Task} from './task';
import {TaskEdit} from './task-edit';

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

  makeTasksData(count).forEach((taskData) => {

    const taskComponent = new Task(taskData);
    const editTaskComponent = new TaskEdit(taskData);

    dist.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      dist.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render();
      dist.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    }
  });

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
