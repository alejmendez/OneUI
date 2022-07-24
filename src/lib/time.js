export const intToTime = (seconds) => {
  const negative = seconds < 0;
  seconds = Math.abs(seconds)
  const minutes = getTwoDigitNumber(Math.floor(seconds / 60));
  const secondsLeft = getTwoDigitNumber(Math.floor(seconds % 60));
  return negative ? `-${minutes}:${secondsLeft}` : `${minutes}:${secondsLeft}`;
};

export const getMinutesfromInt = (seconds) => {
  return Math.floor(seconds / 60);
};

export const getSecondsfromInt = (seconds) => {
  return Math.floor(seconds % 60);
};

export const getTwoDigitNumber = (num) => {
  // Retorna un string con el numero de maximo 59
  if (num < 10) {
    return `0${num}`
  } else if (num > 60) {
    return `59`
  } else {
    return String(num)
  }
};
