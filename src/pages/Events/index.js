import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../store/events/selectors";
import { fetchEvents } from "../../store/events/actions";
import { format } from "date-fns";

export default function Events() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  let groups = events.reduce(function (r, o) {
    var m = o.date.split("/")[1];
    r[m] ? r[m].push(o) : (r[m] = [o]);
    return r;
  }, {});
  var sortEvents = Object.keys(groups).map(function (k) {
    return groups[k];
  });

  console.log(sortEvents);

  // keys-flat

  return (
    <Container className='main'>
      <Row className='header'>
        <Col>Events</Col>
      </Row>
      <Row>Month</Row>
      <Row>
        <Col>
          {sortEvents.map((event) => (
            <p>
              {Object.values(event)[0].date}
              {event.map((e) => (
                <p>{e.title}</p>
              ))}
            </p>
          ))}
          <p></p>
        </Col>
      </Row>
    </Container>
  );
}
