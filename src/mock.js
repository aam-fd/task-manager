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
}

const makeTags = () => {
  let tags = new Set();
  const tagsCount = getRandomNumber(1, tagsList.length);

  if (tags.size < tagsCount) {
    tags.add(tagsList[getRandomNumber(0, tagsList.length - 1)]);
  }
  return tags;
}

export let taskData = {
  title: titles[getRandomNumber(0, titles.length - 1)],
  dueDate: makeDate(),
  tags: makeTags(),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: colors[getRandomNumber(0, colors.length - 1)],
  repeatingDays: {
    mo: !!getRandomNumber(0, 1),
    tu: !!getRandomNumber(0, 1),
    we: !!getRandomNumber(0, 1),
    th: !!getRandomNumber(0, 1),
    fr: !!getRandomNumber(0, 1),
    sa: !!getRandomNumber(0, 1),
    su: !!getRandomNumber(0, 1),
  },
  isFavorite: !!getRandomNumber(0, 1),
  isDone: !!getRandomNumber(0, 1),
};
