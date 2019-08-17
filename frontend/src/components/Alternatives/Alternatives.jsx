import React from "react";
import { msToMin } from "../route/Route";
import "./Alternatives.css";

//prop: visible, data
export const Alternatives = props => (
  <div className="AlternativeContainer">
    {props.alternatives.map(alternative => (
      <Alternative
        key={alternative.arrivalTime}
        delay={`${msToMin(
          alternative.arrivalTime - props.orginialArrivalTime
        )} min`}
        title={alternative.type}
      />
    ))}
  </div>
);

const Alternative = ({ delay, title }) => (
  <div className="Alternative">
    <p>{title}</p>
    <span>{delay}</span>
  </div>
);
