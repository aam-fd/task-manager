import {createElement} from './utils';

export class Filter {
  constructor(name, count) {
    this._name = name;
    this._count = count;

    this._element = null;
    this._onChangeCount = null;
  }

  set onChangeCount(value) {
    this._onChangeCount = value;
  }

  _onChangeButtonClick() {
    return typeof this._onChangeCount === `function` && this._onChangeCount();
  }

  _setDisabled() {
    return this._count > 0 ? `` : `disabled`;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
      <div>
        <input
          type="radio"
          id="filter__${this._name}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._setDisabled()}
        />
        <label 
          for="filter__${this._name}"
          class="filter__label"
        >${this._name}
          <span class="filter__${this._name}-count">${this._count}</span>
        </label>
      </div>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.filter__label`)
      .addEventListener(`click`, this._onChangeButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

}
