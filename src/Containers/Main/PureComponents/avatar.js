import React from 'react';
import PropTypes from 'prop-types';
import '../../container.css';

const Avatar = props => {
  return (
    <div className={'wrapper'} >
      <img className={'hover'} src={props.image} alt="streamerImage"/>
      <p className={'text'}>{props.text}</p>
    </div>
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};

export default Avatar;
