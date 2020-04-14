import React from "react";
import Moment from "react-moment";
import moment from "moment";
import "./App.css";

function App() {
  const calendarStrings = {
    lasthay: "[Yesterday at] LT",
    sameDay: "[Today at] LT",
    nexthay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L",
  };
  const startWeek = moment().startOf("month").week();
  const endWeek = moment().endOf("month").week() + 1;

  let calendar = [];
  for (var week = startWeek; week < endWeek; week++) {
    calendar.push({
      week: week,
      days: Array(7)
        .fill(0)
        // eslint-disable-next-line
        .map((n, i) =>
          moment()
            .week(week)
            .startOf("week")
            .clone()
            .add(n + i, "day")
        ),
    });
  }

  const today = moment().format("DD");

  console.log("week", moment().day());
  console.log("days in the month", moment("2020-02", "YYYY-MM").daysInMonth());

  return (
    <div className='App'>
      <h1>Camily</h1>
      {moment().toString("MM", "YYYY")}
      <table style={{ width: "100%", height: "100%" }}>
        <thead style={{ backgroundColor: "#888", height: "100px" }}>
          <tr>
            <td>#</td>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        {calendar.map((week) => (
          <tbody style={{ height: "100px" }}>
            <tr>
              <td className='week'>{week.week}</td>
              {week.days.map((day) => (
                <td>
                  <span
                    style={
                      day.format("DD") === today
                        ? {
                            backgroundColor: "orange",
                            borderRadius: "100%",
                            margin: "-7%",
                            padding: "7%",
                          }
                        : {}
                    }>
                    {day.format("DD")}
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
