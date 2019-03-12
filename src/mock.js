import {getRandomNumber} from './utils';

const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const tagsList = [`homework`, `theory`, `practice`, `intensive`, `keks`, `spb`, `relax`, `dance`];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const makeDate = () => {
  const currentDateMilliseconds = Date.now();
  const dayMilliseconds = (3600 * 24 * 1000);
  const daysCountOfWeek = 7;
  const weekBeforeMilliseconds = currentDateMilliseconds - dayMilliseconds * daysCountOfWeek;

  const randomDayOfTwoWeeks = getRandomNumber(0, 14);
  return new Date(weekBeforeMilliseconds + randomDayOfTwoWeeks * dayMilliseconds);
};

const makeTags = () => {
  let tags = new Set();
  const tagsCount = getRandomNumber(1, tagsList.length);
  while (tags.size < tagsCount) {
    tags.add(tagsList[getRandomNumber(0, tagsList.length - 1)]);
  }
  return tags;
};

const makeDayChecked = () => {
  return !getRandomNumber(0, 1) ? `checked` : ``;
};

export const makeTaskData = () => {
  return {
    title: titles[getRandomNumber(0, titles.length - 1)],
    dueDate: makeDate(),
    tags: makeTags(),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: colors[getRandomNumber(0, colors.length - 1)],
    repeatingDays: {
      mo: makeDayChecked(),
      tu: makeDayChecked(),
      we: makeDayChecked(),
      th: makeDayChecked(),
      fr: makeDayChecked(),
      sa: makeDayChecked(),
      su: makeDayChecked(),
    },
    isFavorite: !getRandomNumber(0, 1),
    isDone: !getRandomNumber(0, 1),
  };
};
