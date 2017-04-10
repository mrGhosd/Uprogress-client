import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import StepsListItem from 'steps/list/item/StepsListItem';

export class StepsList extends Component {

  state = {
    steps: []
  };

  static propTypes = {
    steps: PropTypes.array,
    dispatch: PropTypes.func,
    currentUser: PropTypes.object,
    user: PropTypes.object
  };

  static defaultProps = {
    steps: [],
    dispatch: () => {},
    currentUser: {},
    user: {}
  };

  render() {
    const { steps, user, currentUser } = this.props;

    return (
      <div className="steps-list">
        <div className="list">
          {steps.map((item) => {
            return (<StepsListItem step={item} user={user} currentUser={currentUser} key={item.id} dispatch={this.props.dispatch} />);
          })}
        </div>
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
    user: state.users.show,
    currentUser: state.users.current,
    direction: state.directions.detail,
    steps: state.steps.list
  };
}

export default connect(mapStateToProps)(StepsList);
