import makeFilterTemplate from './make-filter';
// import makeTaskCardTemplate from './make-task';
import {getRandomNumber} from './utils';
import {makeTaskData} from './mock';
import {Task} from './task';
// import {TaskEdit} from './task-edit';

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

// taskComponent.onEdit = () => {
//   editTaskComponent.render();
//   tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
//   taskComponent.unrender();
// };

// editTaskComponent.onSubmit = () => {
//   taskComponent.render();
//   tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
//   editTaskComponent.unrender();
// }

const renderCards = (dist, count) => {

  // const tasksContainer = document.querySelector(`.board__tasks`);
  // const taskComponent = new Task(task);
  // const editTaskComponent = new TaskEdit(task);

  // tasksContainer.appendChild(taskComponent.render());


  // const tasks = new Array(count);
  // tasks.forEach((_) => {
  //   const taskData = makeTaskData();
  //   const taskComponent = new Task(taskData);
  //   return taskComponent.render();
  // });
  const tasks = [];
  while (count > 0) {
    const taskData = makeTaskData();
    const taskComponent = new Task(taskData);
    const task = taskComponent.render();
    tasks.push(task);
    count--;
  }

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
