import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ children, color, size, weight, style, ...props }) => {
  const textStyle = {
    color: color,
    fontSize: size,
    fontWeight: weight,
    fontFamily: "'Roboto', sans-serif",
    ...style,
  };

  return (
    <span style={textStyle} {...props}>
      {children}
    </span>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

Text.defaultProps = {
  color: '#000',
  size: '16px',
  weight: '400',
  style: {},
};

export default Text;
