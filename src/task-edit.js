import {Component} from './component';
import {colorsName} from './mock';
import flatpickr from 'flatpickr';

export class TaskEdit extends Component {
  constructor(data) {
    super();
    this._color = data.color;
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._state = {
      isDate: false,
      isRepeated: false,
    };

    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeColor = this._onChangeColor.bind(this);
  }

  static createMapper(target) {
    let fullDate = ``;
    return {
      text: (value) => {
        target.title = value;
      },
      date: (value) => {
        fullDate = value;
      },
      time: (value) => {
        fullDate += value;
        target.dueDate = new Date(fullDate);
      },
      hashtag: (value) => target.tags.add(value),
      hashtagInput: (value) => target.tags.add(value),
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
    };
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      dueDate: new Date(),
      tags: new Set(),
      color: ``,
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onSubmitButtonClick(evt) {

    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeColor(evt) {
    console.log(evt);
    const changedColor = evt.target.innerHTML;
    if (changedColor) {
      this._color = changedColor;
    }
    this.unbind();
    this._partialColorUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template
  }

  _partialColorUpdate() {
    this._element.removeAttribute(`class`);
    this._element.innerHTML = this.template;
  }

  set onSubmit(value) {
    this._onSubmit = value;
  }

  _makeTagList(tagsData) {
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

  _makeWeekDaysInner(repeatingDays) {

    const days = [];

    Object.keys(repeatingDays).forEach((weekDay, index) => {

      let checked = repeatingDays.weekDay ? `checked` : ``;

      days.push(`
        <input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${weekDay}-${index}"
          name="repeat"
          value="${weekDay}"
          ${checked}
        />
        <label class="card__repeat-day" for="repeat-${weekDay}-${index}"
          >${weekDay}</label
        >
      `);
    });

    return days.join(``);
  }

  _makeColorsInner(color) {
    const colorTemplates = [];

    colorsName.forEach((colorName) => {
      colorTemplates.push(`
        <input
          type="radio"
          id="color-${colorName}-6"
          class="card__color-input card__color-input--${colorName} visually-hidden"
          name="color"
          value="${colorName}"
          ${color === colorName && `checked`}
        />
        <label
          for="color-${colorName}-6"
          class="card__color card__color--${colorName}"
          >${colorName}</label
        >
      `);
    });
    return colorTemplates.join(``);
  }

  get template() {
    return `
      <article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit"
                >edit</button>
              <button type="button" class="card__btn card__btn--archive"
                >archive</button>
              <button type="button" class="card__btn card__btn--favorites card__btn--disabled"
                >favorites</button>
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
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                  </button>
                  <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days ${!this._state.isRepeated ? `visually-hidden` : ``}">
                    <div class="card__repeat-days-inner">
                      ${this._makeWeekDaysInner(this._repeatingDays)}
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${this._makeTagList(this._tags)}
                  </div>
                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtagInput"
                      placeholder="Type new hashtag here"
                    />
                  </label>
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

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${this._makeColorsInner(this._color)}
                </div>
              </div>
            </div>
            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__colors-wrap`)
      .addEventListener(`click`, this._onChangeColor);

    if (this._state.isDate) {
      flatpickr(`.card__date`, {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(`.card__time`, {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
      this._element.querySelector(`.card__colors-wrap`)
      .removeEventListener(`click`, this._onChangeColor);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }

}
