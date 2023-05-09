function getFormatedTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const morning = hours >= 12 ? "PM" : "AM";
  const formatedHours = hours > 12 ? hours % 12 : hours;
  const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${
    formatedHours < 10 ? `0${formatedHours}` : formatedHours
  }:${formatedMinutes} ${morning}`;
}

export { getFormatedTime };
