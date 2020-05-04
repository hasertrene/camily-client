import React, { useEffect, useState } from "react";
import {
  format,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  getWeek,
  getDay,
  addDays,
  setMonth,
  setYear,
  getYear,
  getMonth,
} from "date-fns";
import Day from "../../components/Calendar/Day";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectEvents, selectBdays } from "../../store/events/selectors";
import { fetchEventsByMonth, fetchBirthdays } from "../../store/events/actions";
import "../../styles/style.scss";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Calendar() {
  const date = { year: getYear(new Date()), month: getMonth(new Date()) };
  const getParams = useParams();
  const history = useHistory();
  const params =
    history.location.pathname === "/"
      ? date
      : { year: getParams.year, month: getParams.month };
  const user = useSelector(selectUser);
  const month = setYear(setMonth(new Date(), params.month), params.year);
  console.log();

  const startMonth = format(startOfMonth(month), "dd");
  const endMonth = format(endOfMonth(month), "dd");
  const firstDay = getDay(startOfMonth(month));
  // eslint-disable-next-line
  const [locale, setLocale] = useState("en-US");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const dispatch = useDispatch();
  const eventlist = useSelector(selectEvents);
  const birthdays = useSelector(selectBdays);
  const events = eventlist.concat(birthdays);

  useEffect(() => {
    dispatch(fetchEventsByMonth(params));
    dispatch(fetchBirthdays(params.month));
  }, [history.location.key, dispatch]);

  const nextMonth = () => {
    if (params.month === "11") {
      history.push(`/${Number(params.year) + 1}/0`);
      return;
    }
    history.push(`/${Number(params.year)}/${Number(params.month) + 1}`);
  };
  const previousMonth = () => {
    if (params.month === "0") {
      history.push(`/${Number(params.year) - 1}/11`);
      return;
    }
    history.push(`/${Number(params.year)}/${Number(params.month) - 1}`);
  };
  // eslint-disable-next-line
  const changeYear = (e) => {
    if (e.target.value.length === 4) {
      history.push(`/${e.target.value}/${Number(params.month)}`);
    }
  };

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
    hollowDays.fill({ id: 9, date: "0001-01-01", dayOfTheWeek: 7 }, 0);
    calendar = hollowDays.concat(calendar);
  }
  if (firstDay === 0) {
    const hollowDays = Array(6);
    hollowDays.fill({ id: 10, date: "0001-01-01", dayOfTheWeek: 7 }, 0);
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

  // console.log(birthdays);

  return (
    <Container fluid='lg' className='main'>
      <Row className='header'>
        <Col>
          <Button size='lg' variant='info' onClick={() => previousMonth()}>
            {" "}
            &#8592;{" "}
          </Button>
        </Col>
        <Col>{format(month, "MMMM")}</Col>
        <Col>
          {/* The year didn't update as I added the months */}
          {/* <InputGroup as={Col} size='lg'>
            <FormControl
              type='number'
              className='yearInput'
              style={{
                fontSize: "2rem",
                color: "black",
                border: "none",
                paddingBottom: "2.2vh",
              }}
              onChange={(e) => changeYear(e)}
              defaultValue={format(month, "yyyy")}
            />
          </InputGroup> */}
          {format(month, "yyyy")}
        </Col>
        <Col>
          <Button size='lg' variant='info' onClick={() => nextMonth()}>
            {" "}
            &#8594;{" "}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table size='sm' borderless className='table'>
            <thead>
              <tr>
                <th>#</th>
                {daysOfTheWeek.map((day, index) => (
                  <th key={index}>
                    {new Intl.DateTimeFormat(locale, {
                      weekday: `${isTabletOrMobile ? "short" : "long"}`,
                    }).format(day)}
                  </th>
                ))}
              </tr>
            </thead>
            {week(calendar, 7).map((week, index) => (
              <tbody key={index}>
                <tr>
                  {week.map((day, index) => (
                    <td
                      key={index}
                      style={day.date !== "0001-01-01" ? {} : { opacity: "0" }}>
                      {day.number ? (
                        <div className='cell-wkno'>{day.number}</div>
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
