// Get datetime now
export const getDateTimeNow = () => {
  const current = new Date();

  function leadingZero(x) {
    return (x < 10 ? "0" : "") + x;
  }

  const cDate =
    current.getFullYear() +
    "-" +
    leadingZero(current.getMonth() + 1) +
    "-" +
    leadingZero(current.getDate());
  const cTime =
    leadingZero(current.getHours()) +
    ":" +
    leadingZero(current.getMinutes()) +
    ":" +
    leadingZero(current.getSeconds());
  const dateTime = cDate + " " + cTime;
  return dateTime;
};
