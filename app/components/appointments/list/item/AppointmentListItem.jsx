import css from './AppointmentListItem.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import moment from 'moment';

import SvgIcon from 'SVGIcon/SVGIcon';
import Popover from 'react-popover';

import AppointmentsForm from 'appointments/form/AppointmentsForm';

export default class AppointmentListItem extends Component {

  state = {
    appointmentPopoverOpen: false
  };

  static propTypes = {
    appointment: PropTypes.object,
    dispatch: PropTypes.func,
    direction: PropTypes.object
  };

  static defaultProps = {
    appointment: {},
    direction: {},
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

  togglePopover() {
    this.setState({ appointmentPopoverOpen: !this.state.appointmentPopoverOpen });
  }

  outerClick(event) {
    if (event.target.className && !event.target.className.match(/react-datepicker/)) {
      this.setState({ appointmentPopoverOpen: !this.state.appointmentPopoverOpen });
    }
  }

  render() {
    const { appointmentPopoverOpen } = this.state;
    const { appointment, direction } = this.props;
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
        <div className="actions">
          <Popover
            isOpen={appointmentPopoverOpen}
            onOuterAction={this::this.outerClick}
            body={<AppointmentsForm direction={direction} appointment={appointment} />}
            preferPlace="right">
            <a onClick={this::this.togglePopover}>
              <SvgIcon icon="edit-step" />
            </a>
          </Popover>
        </div>
      </div>
    );
  }
}
