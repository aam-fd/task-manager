export const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getFormatDate = (date) => {
  let day = date.getDate();
  day = day < 10 ? `0` + day : day;

  const months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `March`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];
  let month = date.getMonth();

  return day + ` ` + months[month].toUpperCase();
};

export const getFormatTime = (date) => {
  const timeOptions = {
    hour: `numeric`,
    minute: `numeric`
  };

  return date.toLocaleTimeString(`en-US`, timeOptions);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
