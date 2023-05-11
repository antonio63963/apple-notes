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

function getMmDdYy(date: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  return `${month} ${day}, ${year}`;
}

export { getFormatedTime, getMmDdYy };
