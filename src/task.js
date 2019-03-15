import {getFormatDate, getFormatTime, createElement} from './utils';

export class Task {
  constructor(data) {
    this._color = data.color;
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._state = {
      // Состояние компонента
    };
    this._onEdit = null;
  }

  // setEditClass() {
  //   this._element.querySelector(`.card`).classList.add(`card--edit`);
  // }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
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
        <form class="card__form" method="get">
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
                        value="${getFormatDate(this._dueDate)}"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__time"
                        type="text"
                        placeholder="11:15 PM"
                        name="time"
                        value="${getFormatTime(this._dueDate)}"
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
                <input
                  type="file"
                  class="card__img-input visually-hidden"
                  name="img"
                />
                <img
                  src="${this._picture}"
                  alt="task picture"
                  class="card__img"
                />
              </label>
            </div>
          </div>
        </form>
      </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    // this.onEdit(null);
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
