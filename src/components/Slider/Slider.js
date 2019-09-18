import React from "react";
import PropTypes from "prop-types";
import SliderRange from "react-input-slider";

Slider.propTypes = {
  axis: PropTypes.string,
  stepX: PropTypes.number,
  minimumX: PropTypes.number,
  maximumX: PropTypes.number,
  valueX: PropTypes.number,
  timeType: PropTypes.string,
  rangeType: PropTypes.string,
  onChange: PropTypes.func
};

Slider.defaultProps = {
  axis: "x",
  stepX: 1,
  minimumX: 0,
  maximumX: 60,
  valueX: 30,
  rangeType: "min"
};

function Slider({
  axis,
  stepX,
  minimumX,
  maximumX,
  valueX,
  timeType,
  rangeType,
  onChange
}) {
  const customStyles = {
    track: {
      width: "100%",
      height: 8,
      backgroundColor: "#eee",
      boxShadow: "inset 0 .1rem .3rem #ddd"
    },
    active: {
      backgroundColor: "#005B99"
    },
    thumb: {
      width: 20,
      height: 12,
      borderRadius: 3,
      boxShadow: "0 1px 6px hsla(204, 100%, 30%, 0.16)"
    }
  };

  return (
    <div className="slider">
      <div className="time">
        <p className="time__type">{timeType}</p>
        <p className="time__initial">
          {valueX} {rangeType}
        </p>
      </div>

      <SliderRange
        axis={axis}
        xstep={stepX}
        xmin={minimumX}
        xmax={maximumX}
        x={valueX}
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  );
}

export default Slider;
