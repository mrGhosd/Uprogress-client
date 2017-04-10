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

  getIcon(appointment) {
    let icon;

    if (appointment.available) {
      icon = 'sand_clock_icon';
    }
    else {
      icon = 'icon-success';
    }

    return <SvgIcon icon={icon} />;
  }

  formtDate(appointment) {
    const validDate = moment(appointment.date).format('dddd, MMMM Do, YYYY h:mm');
    let template;

    if (appointment.available) {
      template = validDate;
    }
    else {
      template = (<strike>{validDate}</strike>);
    }

    return template;
  }

  render() {
    const { appointment } = this.props;
    const date = this.formtDate(appointment);
    const icon = this.getIcon(appointment);

    return (
      <div className={CN(css.appointmentListItem)}>
        <div className="icon">
          {icon}
        </div>
        <div className="info">
          <div className="date">
            {date}
          </div>
          <div className="message">
            {appointment.message && appointment.message}
          </div>
        </div>
      </div>
    );
  }
}
