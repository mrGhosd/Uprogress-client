import React, { Component } from 'react';

import { connect } from 'react-redux';

export class AppointmentsList extends Component {
  render() {
    return (
      <div>Appointments List</div>
    );
  }
}

export default connect()(AppointmentsList);
