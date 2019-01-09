import React from 'react';
import PropTypes from 'prop-types';

const Comments = props => {
  const { text } = props;
  return (
    <div>
      {
        Object.keys(text).map(item => (
          <div key={item}>
            <p className={'userName'}><b> {text[item].name} </b></p>
            <p className={'comments'}> {text[item].text} </p>
          </div>
        ))
      }
    </div>
  );

};

Comments.propTypes = {
  text: PropTypes.array,
};

export default Comments;
