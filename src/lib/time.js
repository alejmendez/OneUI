export const intToTime = (seconds) => {
  const minutes = getTwoDigitNumber(Math.floor(seconds / 60));
  const secondsLeft = getTwoDigitNumber(seconds % 60);
  return `${minutes}:${secondsLeft}`;
};

export const getTwoDigitNumber = (num) => {
  return num < 10 ? `0${num}` : num;
};
