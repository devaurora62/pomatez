import React from "react";
import PropTypes from "prop-types";

Progress.propTypes = {
  dashOffset: PropTypes.number
};

Progress.defaultProps = {
  dashOffset: 0
};

function Progress({ dashOffset }) {
  return (
    <svg className="progress">
      <defs>
        <filter id="inset-shadow">
          <feFlood floodColor="rgba(0,0,0,.25)" />
          <feComposite operator="out" in2="SourceGraphic" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
      </defs>
      <circle
        className="progress__circle"
        id="circle-base"
        cx="160"
        cy="160"
        r="156"
        filter="url(#inset-shadow)"
      />
      <circle
        className="progress__circle"
        id="circle-counter"
        cx="160"
        cy="160"
        r="156"
        style={{
          strokeDashoffset: `${dashOffset}`
        }}
      />
    </svg>
  );
}

export default Progress;
