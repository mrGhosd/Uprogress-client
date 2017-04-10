import React, { Component, PropTypes } from 'react';

import moment from 'moment';

export default class AppointmentListItem extends Component {
  static propTypes = {
    appointment: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    appointment: {},
    dispatch: () => {}
  };

  render() {
    const { appointment } = this.props;

    return (
      <div>
        {moment(appointment.date).format('dddd, MMMM Do, YYYY h:mm')}
      </div>
    );
  }
}
