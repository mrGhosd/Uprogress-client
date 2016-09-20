import React, { Component, PropTypes } from 'react';

import StepsListItem from 'steps/list/item/StepsListItem';

export default class StepsList extends Component {

  state = {
    steps: []
  };

  static propTypes = {
    steps: PropTypes.array,
    dispatch: PropTypes.func,
    user: PropTypes.object
  };

  static defaultProps = {
    steps: [],
    dispatch: () => {},
    user: {}
  };

  render() {
    const { steps, user } = this.props;

    return (
      <div className="steps-list">
        <h3>Steps List</h3>
        <div className="list">
          {steps.map((item) => {
            return (<StepsListItem step={item} user={user} key={item.id} dispatch={this.props.dispatch} />);
          })}
        </div>
      </div>
    );
  }
}
