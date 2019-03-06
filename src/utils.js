export const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

export const getFormatDate = (date) => {
  let day = date.getDate();
  if (day < 10) day = `0` + day;

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
}

export const getFormatTime = (date) => {
  const timeOptions = {
    hour: `numeric`,
    minute: `numeric`
  };

  return date.toLocaleTimeString(`en-US`, timeOptions);
}
