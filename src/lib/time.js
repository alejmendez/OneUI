export const intToTime = (seconds) => {
  const negative = seconds < 0;
  seconds = Math.abs(seconds)
  const minutes = getTwoDigitNumber(Math.floor(seconds / 60));
  const secondsLeft = getTwoDigitNumber(seconds % 60);
  return negative ? `-${minutes}:${secondsLeft}` : `${minutes}:${secondsLeft}`;
};

export const getTwoDigitNumber = (num) => {
  return num < 10 ? `0${num}` : num;
};
