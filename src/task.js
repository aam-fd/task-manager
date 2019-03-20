import {Component} from './component';
import moment from 'moment';

export class Task extends Component {
  constructor(data) {
    super();
    this._color = data.color;
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._state = {
      // Состояние компонента
    };
    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === `checked`);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(value) {
    this._onEdit = value;
  }

  _makeTags(tagsData) {
    const tags = [];

    tagsData.forEach((tagData) => {
      tags.push(`
        <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="${tagData}"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            #${tagData}
          </button>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>
      `);
    });

    return tags.join(``);
  }

  get template() {
    return `
      <article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                  disabled
                >${this._title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                        value="${moment(this._dueDate).format(`DD MMMM`)}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${moment(this._dueDate).format(`LT`)}"
                      />
                    </label>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${this._makeTags(this._tags)}
                  </div>
                </div>
              </div>

              <label class="card__img-wrap">
                <img
                  src="${this._picture}"
                  alt="task picture"
                  class="card__img"
                />
              </label>
            </div>
          </div>

      </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }

}
