import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../store/events/selectors";
import { fetchEvents } from "../../store/events/actions";
import { format, getMonth } from "date-fns";

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
      <Row>
        <Col>
          {sortEvents.map((event) => (
            <Card>
              <Card.Title>
                {format(
                  new Date(
                    2000,
                    Object.values(event)[0].date.split("/")[1] - 1,
                    1
                  ),
                  "MMMM"
                )}
              </Card.Title>
              {event.map((e) => (
                <p>{e.title}</p>
              ))}
            </Card>
          ))}
          <p></p>
        </Col>
      </Row>
    </Container>
  );
}
