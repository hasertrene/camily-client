import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../store/events/selectors";
import { fetchEvents } from "../../store/events/actions";
// import { fetchMembers } from '../../store/user/actions'
import Event from "../../components/Event";
import { format, getMonth } from "date-fns";

export default function Events() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
    // dispatch(fetchMembers())
  }, [dispatch]);

  // Gather events per month: [m]
  let groups = events.reduce(function (acc, event) {
    let m = event.date.split("/")[1];
    acc[m] ? acc[m].unshift(event) : (acc[m] = [event]);
    return acc;
  }, {});
  // Put events into arrays of that month
  let sortEvents = Object.keys(groups)
    .sort((a, b) => a - b)
    .map(function (k) {
      return groups[k];
    });

  return (
    <Container fluid='sm' className='main'>
      <Row className='header'>
        <Col>Events</Col>
      </Row>
      <Row>
        <Col>
          {sortEvents.map((event, index) => {
            const events = event.sort(
              (a, b) => a.date.split("")[1] - b.date.split("")[1]
            );
            return (
              <Accordion key={index} defaultActiveKey={index}>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={index}>
                    {format(
                      new Date(
                        2000,
                        Object.values(event)[0].date.split("/")[1] - 1,
                        1
                      ),
                      "MMMM"
                    )}
                  </Accordion.Toggle>
                  {events.map((e, i) => (
                    <Accordion.Collapse key={i} eventKey={index}>
                      <Event {...e} />
                    </Accordion.Collapse>
                  ))}
                </Card>
              </Accordion>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
