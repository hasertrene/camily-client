import React, { useState } from "react";
import Moment from "react-moment";
import moment from "moment";
import "moment/locale/nl";
import "./App.scss";

function App() {
  const [incrementMonth, setIncrementMonth] = useState(0);
  const now = moment();
  const date = moment(now).add(incrementMonth, "months").clone();

  const startWeek = moment(now)
    .add(incrementMonth, "months")
    .startOf("month")
    .isoWeekday(1)
    .isoWeek();
  const endWeek = moment(now)
    .add(incrementMonth, "months")
    .endOf("month")
    .isoWeekday(1)
    .isoWeek();

  const today = moment(now).format("DD/MM/YYYY");

  var weekDays = Array.apply(null, Array(7)).map(function (_, i) {
    return moment(i, "e")
      .startOf("week")
      .isoWeekday(i + 1)
      .format("dddd");
  });

  const calendar = [];
  for (let week = startWeek; week <= endWeek; week++) {
    calendar.push({
      week: week,
      days: Array(7)
        .fill(0)
        // eslint-disable-next-line
        .map((n, i) =>
          moment()
            .isoWeek(week)
            .startOf("isoWeek")
            .isoWeekday(1)
            .add(n + i, "day")
        ),
    });
  }

  console.log("moment", now);
  console.log(startWeek, endWeek);

  return (
    <div className='App'>
      <h1>Camily</h1>
      <h2>
        <button onClick={() => setIncrementMonth(incrementMonth - 1)}>
          previous
        </button>
        {moment(now).add(incrementMonth, "months").format("MMMM YYYY")}
        <button onClick={() => setIncrementMonth(incrementMonth + 1)}>
          next
        </button>
      </h2>
      <table>
        <thead>
          <tr>
            <td>#</td>
            {weekDays.map((day) => (
              <th>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
            ))}
          </tr>
        </thead>
        {calendar.map((week) => (
          <tbody>
            <tr
              style={
                week.week === moment().isoWeek()
                  ? { backgroundColor: "rgba(180,255,180,0.8)" }
                  : {}
              }>
              <td className='week'>{week.week}</td>
              {week.days.map((day) => (
                <td>
                  <span
                    style={
                      day.format("DD/MM/YYYY") === today
                        ? {
                            backgroundColor: "rgba(255,0,10,0.6)",
                            border: "1px solid #333",
                            borderRadius: "100%",
                            margin: "-10%",
                            padding: "10%",
                          }
                        : day.format("MM/YYYY") !== date.format("MM/YYYY")
                        ? { opacity: "0.3" }
                        : {}
                    }>
                    {day.format("D")}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default App;
