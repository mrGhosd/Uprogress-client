import css from './AppointmentListItem.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import moment from 'moment';

import SvgIcon from 'SVGIcon/SVGIcon';

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
      <div className={CN(css.appointmentListItem)}>
        <div className="icon">
          <SvgIcon icon="sand_clock_icon" />
        </div>
        <div className="info">
          {moment(appointment.date).format('dddd, MMMM Do, YYYY h:mm')}
        </div>
      </div>
    );
  }
}
