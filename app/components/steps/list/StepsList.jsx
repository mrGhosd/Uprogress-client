import React, { Component, PropTypes } from 'react';

import StepsListItem from 'steps/list/item/StepsListItem';

export default class StepsList extends Component {

  static propTypes = {
    steps: PropTypes.array,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    steps: [],
    dispatch: () => {}
  };

  render() {
    const { steps } = this.props;

    return (
      <div className="steps-list">
      <h3>Steps List</h3>
      {steps.map((item, index) => {
        return (<StepsListItem step={item} key={index} dispatch={this.props.dispatch} />);
      })}
      </div>
    );
  }
}
