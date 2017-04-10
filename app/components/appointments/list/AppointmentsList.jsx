import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import AppointmentListItem from 'appointments/list/item/AppointmentListItem';

export class AppointmentsList extends Component {

  static propTypes = {
    appointments: PropTypes.array,
    dispatch: PropTypes.func,
    direction: PropTypes.object,
    currentUser: PropTypes.object,
    user: PropTypes.object
  };

  static defaultProps = {
    appointments: [],
    dispatch: () => {},
    currentUser: {},
    user: {},
    direction: {}
  };


  render() {
    const { appointments, user, currentUser } = this.props;

    return (
      <div>
        {appointments.map((item) => {
          return (<AppointmentListItem appointment={item}
                                       user={user}
                                       currentUser={currentUser}
                                       key={item.id}
                                       dispatch={this.props.dispatch} />);
        })}
      </div>
    );
  }
}

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    appointments: state.appointments.list,
    user: state.users.show,
    currentUser: state.users.current,
    direction: state.directions.show
  };
}

export default connect(mapStateToProps)(AppointmentsList);
