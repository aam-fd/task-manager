'use strict';

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min) + min);
};

const mainFilterSection = document.querySelector(`.main__filter`);
const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const getFilterTemplate = (filterName, count) => {

  const disabled = count > 0 ? `` : `disabled`;

  return `
    <input
    type="radio"
    id="filter__${filterName}"
    class="filter__input visually-hidden"
    name="filter"
    ${disabled}
    />
    <label for="filter__${filterName}" class="filter__label"
    >${filterName} <span class="filter__${filterName}-count">${count}</span></label
    >
  `;
};

filterNames.forEach(element => {

  const div = document.createElement(`div`);
  const count = getRandomNumber(0, 10);

  div.innerHTML = getFilterTemplate(element, count);

  mainFilterSection.appendChild(div);
});
