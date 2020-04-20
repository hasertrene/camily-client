import React, { useState, useEffect } from "react";
import { selectEventDetails } from "../../store/eventDetails/selectors";
import { useSelector, useDispatch } from "react-redux";
import {
  updateEvent,
  postEvent,
  fetchEventById,
} from "../../store/eventDetails/actions";

export default function eventDetails() {
  return <div></div>;
}
