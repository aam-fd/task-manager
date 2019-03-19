import {Filter} from './filter';
import {getRandomNumber} from './utils';
import {makeTasksData} from './mock';
import {Task} from './task';
import {TaskEdit} from './task-edit';

// отрисовка всех фильтров
const mainFilterSection = document.querySelector(`.main__filter`);
const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

filterNames.forEach((name) => {
  const count = getRandomNumber(0, 10);

  const filterComponent = new Filter(name, count);
  mainFilterSection.appendChild(filterComponent.render());

  filterComponent.onChangeCount = () => {

    const taskCards = document.querySelectorAll(`.card`);
    [].forEach.call(taskCards, (card) => {
      card.remove();
    });

    const tasksCount = getRandomNumber(1, 10);
    renderCards(boardTasksSection, tasksCount);
  };
});

// отрисовка всех карточек задач
let FIRST_LOAD_TASKS_COUNT = 7; // `отрисуйте семь одинаковых карточек задач в .board__tasks`
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

    editTaskComponent.onSubmit = (newObject) => {
      taskData.title = newObject.title;
      taskData.dueDate = newObject.dueDate;
      taskData.tags = newObject.tags;
      taskData.color = newObject.color;
      taskData.repeatingDays = newObject.repeatingDays;

      taskComponent.update(taskData);
      taskComponent.render();
      dist.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };
  });

};

renderCards(boardTasksSection, FIRST_LOAD_TASKS_COUNT);
