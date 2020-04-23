import React, { useEffect, useState } from "react";
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
import Day from "../../components/Calendar/Day";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectEvents } from "../../store/events/selectors";
import { fetchEvents } from "../../store/events/actions";
import "../../styles/style.scss";
import { Button, Table, Container, Row, Col } from "react-bootstrap";

export default function Calendar() {
  const date = new Date();
  const user = useSelector(selectUser);
  const [incrementMonth, setIncrementMonth] = useState(0);
  const [incrementYear, setIncrementYear] = useState(0);
  const month = addYears(addMonths(date, incrementMonth), incrementYear);
  const startMonth = format(startOfMonth(month), "dd");

  const endMonth = format(endOfMonth(month), "dd");
  const firstDay = getDay(startOfMonth(month));

  const [locale, setLocale] = useState("en-US");

  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  let calendar = [];
  // For every day in the month, set up the information of that day
  for (var i = startMonth; i <= endMonth; i++) {
    const newDate = new Date(
      format(month, "yyyy"),
      format(month, "MM") - 1, // the month is 0-indexed
      i
    );
    // Get the days as strings, for the information per day
    const dayString = new Intl.DateTimeFormat(locale, {
      weekday: "long",
    }).format(newDate);

    // Push the information per day
    calendar.push({
      id: i,
      dayOfTheWeek: getDay(newDate),
      dayString: dayString.charAt(0).toUpperCase() + dayString.slice(1),
      weekNumber:
        getDay(newDate) === 0 ? getWeek(newDate) - 1 : getWeek(newDate),
      date: format(new Date(newDate), "yyyy-MM-dd"),
    });
  }
  // If the first day of the month is not a monday, add 'hollow days' to fill in the Table.
  if (firstDay > 1) {
    const hollowDays = Array(Math.abs(1 - firstDay));
    hollowDays.fill({ id: 9, date: null, dayOfTheWeek: 7 }, 0);
    calendar = hollowDays.concat(calendar);
  }
  if (firstDay === 0) {
    const hollowDays = Array(6);
    hollowDays.fill({ id: 10, date: null, dayOfTheWeek: 7 }, 0);
    calendar = hollowDays.concat(calendar);
  }

  // Create the week rows for the table
  function week(days, len) {
    let weeks = [],
      i = 0,
      n = days.length;
    while (i < n) {
      weeks.push(days.slice(i, (i += len)));
    }
    weeks.forEach((week, i) => {
      const weekno = week.find((obj) => {
        return obj.weekNumber;
      });
      week.unshift({ id: 6, date: 100, number: weekno.weekNumber });
    });
    return weeks;
  }

  // Get the day Strings of a random week, for the Table headers
  const daysOfTheWeek = eachDayOfInterval({
    start: new Date(new Date("December 25, 1995 23:15:30")),
    end: new Date(addDays(new Date("December 25, 1995 23:15:30"), 6)),
  });

  console.log(week(calendar, 7));

  return (
    <Container fluid className='main'>
      <Row className='header'>
        <Col>
          <Button
            size='lg'
            variant='info'
            onClick={() => setIncrementMonth(incrementMonth - 1)}>
            {" "}
            &#8592;{" "}
          </Button>
        </Col>
        <Col>{format(month, "MMMM yyyy")}</Col>
        <Col>
          <Button
            size='lg'
            variant='info'
            onClick={() => setIncrementMonth(incrementMonth + 1)}>
            {" "}
            &#8594;{" "}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table borderless size='sm' className='table'>
            <thead>
              <tr>
                <th>#</th>
                {daysOfTheWeek.map((day, index) => (
                  <th key={index}>
                    {new Intl.DateTimeFormat(locale, {
                      weekday: "long",
                    }).format(day)}
                  </th>
                ))}
              </tr>
            </thead>
            {week(calendar, 7).map((week, index) => (
              <tbody key={index}>
                <tr>
                  {week.map((day, index) => (
                    <td key={index} style={day.date ? {} : { opacity: "0" }}>
                      {day.number ? (
                        <div
                          style={{
                            fontSize: "10vh",
                            color: "#00000033",
                            justifyContent: "justify",
                          }}>
                          {day.number}
                        </div>
                      ) : (
                        <Day {...day} events={events} user={user} />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            ))}
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
