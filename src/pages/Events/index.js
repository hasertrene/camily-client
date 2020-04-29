import React, { useEffect } from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../../store/events/selectors";
import { fetchEventsByYear } from "../../store/events/actions";
import { useParams, useHistory } from "react-router-dom";
import Event from "../../components/Event/index.js";
import { format, getYear } from "date-fns";

export default function Events() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const date = { year: getYear(new Date()) };
  const getParams = useParams();
  const history = useHistory();
  const params =
    history.location.pathname === "/events/" ||
    history.location.pathname === "/events"
      ? date
      : { year: getParams.year };

  useEffect(() => {
    dispatch(fetchEventsByYear(params.year));
  }, [dispatch]);

  // Gather events per month: [m]
  let groups = events.reduce(function (acc, event) {
    let m = event.date.split("-")[1];
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
    <Container className='main'>
      <Row className='header'>
        <Col>Events {params.year}</Col>
      </Row>
      <Row>
        <Col>
          {sortEvents.map((event, index) => {
            const events = event.sort(
              (a, b) => a.date.split("-")[2] - b.date.split("-")[2]
            );
            return (
              <Accordion key={index} defaultActiveKey={index}>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={index}>
                    {format(new Date(event[0].date), "MMMM")}
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
