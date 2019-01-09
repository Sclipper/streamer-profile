import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';

const Rating = props => {
  return(
    <div>
      <ReactStars
        className={'stars'}
        onChange={props.ratingChanged}
        count={5}
        size={80}
        color2={'gold'}
        value={props.value}
      />
    </div>
  );
};

Rating.propTypes = {
  ratingChanged: PropTypes.func,
  value: PropTypes.number,
};

export default Rating;
