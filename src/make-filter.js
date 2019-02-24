export default (filterName, count) => {

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
