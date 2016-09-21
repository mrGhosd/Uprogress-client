import React, { Component, PropTypes } from 'react';

import StepsListItem from 'steps/list/item/StepsListItem';

export default class StepsList extends Component {

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
        <h3>Steps List</h3>
        <div className="list">
          {steps.map((item) => {
            return (<StepsListItem step={item} user={user} currentUser={currentUser} key={item.id} dispatch={this.props.dispatch} />);
          })}
        </div>
      </div>
    );
  }
}
