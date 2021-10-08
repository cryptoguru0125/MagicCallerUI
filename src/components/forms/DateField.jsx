import React from 'react';
import PropTypes from 'prop-types';
import { MDBDatePicker } from 'mdbreact';

import './DateField.scss';

const DateField = (props) => {
  const {
    input,
    meta: { touched, error },
  } = props;

  let status = '';
  if (touched && error) {
    status = 'has-error';
  } else if (!error) {
    status = 'has-success';
  }

  return (
    <div className={`control ${status}`}>
      <MDBDatePicker
        emptyLabel="MM/DD/YYYY"
        format="MM/DD/YYYY"
        className="date-field"
        valueDefault={null}
        value={input.value}
        getValue={input.onChange}
      />
    </div>
  );
};

DateField.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default DateField;
