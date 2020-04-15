import React, { useState } from "react";
import {
  format,
  addMonths,
  endOfMonth,
  startOfMonth,
  getWeeksInMonth,
  getWeek,
  setMonth,
  getMonth,
  getDaysInMonth,
  eachDay,
  getDay,
  getISOWeek,
} from "date-fns";
import "../App.scss";

export default function Calendar() {
  const [incrementMonth, setIncrementMonth] = useState(0);
  const date = new Date();
  const today = format(new Date(), "dd/MM/yyyy");
  // const month = format(new Date(), "MMM yyyy");
  const month = setMonth(date, getMonth(addMonths(date, incrementMonth)));
  const startMonth = format(startOfMonth(month), "d");
  const endMonth = format(endOfMonth(month), "d");

  const calendar = [];
  for (var i = startMonth; i <= endMonth; i++) {
    const newDate = new Date(
      parseInt(format(month, "yyyy")),
      parseInt(format(month, "M")) - 1,
      parseInt(i)
    );
    const dayString = new Intl.DateTimeFormat("nl-NL", {
      weekday: "long",
    }).format(newDate);

    calendar.push({
      dayOfTheWeek: getDay(newDate),
      dayString: dayString.charAt(0).toUpperCase() + dayString.slice(1),
      weekNumber: getISOWeek(newDate),
      day: parseInt(i),
      month: parseInt(format(month, "M")),
      year: parseInt(format(month, "yyyy")),
    });
  }
  function week(days, len) {
    let weeks = [],
      i = 0,
      n = days.length;
    // if(format(startOfMonth(month), "d")){
    //   for(i=0; i < )
    // }
    while (i < n) {
      weeks.push(days.slice(i, (i += len)));
    }
    return weeks;
  }
  console.log(week(calendar, 7));
  console.log("calendar", calendar);
  console.log(getDay(new Date(2020, 3, 15))); // the month is 0-indexed
  return (
    <div>
      {format(month, "MMM, yyyy")}
      <input
        type='number'
        onChange={(event) => setIncrementMonth(event.target.value)}
      />
      {week(calendar, 7).map((week) => (
        <p>{week.map((day) => day.dayString)}</p>
      ))}
    </div>
  );
}
