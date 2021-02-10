import { FormattedDate } from "../types";

const months = [
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
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDate = (d: number): FormattedDate => {
  const dateMs = d * 1000;
  const fullDate = new Date(dateMs);

  let day = days[fullDate.getDay()];
  let date = fullDate.getDate();
  let month = months[fullDate.getMonth()];
  let year = fullDate.getFullYear();

  return { day, date, month, year };
};
