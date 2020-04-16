import React, { useState } from "react";
import {
  format,
  eachDayOfInterval,
  addMonths,
  addYears,
  endOfMonth,
  startOfMonth,
  getWeek,
  getDay,
  addDays,
} from "date-fns";
import Day from "./day";
import "./style.scss";
import { Button, Table } from "react-bootstrap";

export default function Index() {
  const [incrementMonth, setIncrementMonth] = useState(0);
  const [incrementYear, setIncrementYear] = useState(0);
  const [locale, setLocale] = useState("en-US");
  const date = new Date();
  const month = addYears(addMonths(date, incrementMonth), incrementYear);
  const startMonth = format(startOfMonth(month), "d");
  const endMonth = format(endOfMonth(month), "d");

  let calendar = [];
  for (var i = startMonth; i <= endMonth; i++) {
    const newDate = new Date(
      parseInt(format(month, "yyyy")),
      parseInt(format(month, "M")) - 1, // the month is 0-indexed
      parseInt(i)
    );
    const dayString = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
    }).format(newDate);

    calendar.push({
      id: parseInt(i),
      dayOfTheWeek: getDay(newDate),
      dayString: dayString.charAt(0).toUpperCase() + dayString.slice(1),
      weekNumber: getWeek(newDate),
      day: parseInt(i),
      month: parseInt(format(month, "M")),
      year: parseInt(format(month, "yyyy")),
    });
  }

  if (getDay(startOfMonth(month)) !== 1) {
    const firstDay = getDay(startOfMonth(month));
    const hollowDays = Array(Math.abs(1 - firstDay)).fill(
      { id: 1, day: null },
      0
    );
    calendar = hollowDays.concat(calendar);
  }

  function week(days, len) {
    let weeks = [],
      i = 0,
      n = days.length;
    while (i < n) {
      weeks.push(days.slice(i, (i += len)));
    }
    return weeks;
  }

  const daysOfTheWeek = eachDayOfInterval({
    start: new Date(new Date("December 25, 1995 23:15:30")),
    end: new Date(addDays(new Date("December 25, 1995 23:15:30"), 6)),
  });

  // console.log(week(calendar, 7));
  // console.log("calendar", calendar);
  console.log();

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "2rem" }}>
        <Button
          size='lg'
          variant='outline-secondary'
          onClick={() => setIncrementMonth(incrementMonth - 1)}>
          {" "}
          {"KAK"}{" "}
        </Button>
        {format(month, "MMM, yyyy")}
        <Button
          size='lg'
          variant='outline-secondary'
          onClick={() => setIncrementMonth(incrementMonth + 1)}>
          {" "}
          {">"}{" "}
        </Button>
      </div>
      <Table responsive>
        <thead>
          <tr>
            {daysOfTheWeek.map((day) => (
              <th>
                {new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
                  day
                )}
              </th>
            ))}
          </tr>
        </thead>
        {week(calendar, 7).map((week) => (
          <tbody>
            <tr>
              {week.map((day) => (
                <Day key={day.id} {...day} />
              ))}
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}
