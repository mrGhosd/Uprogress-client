import React, { Component, PropTypes } from 'react';

export default class StepsList extends Component {

  static propTypes = {
    steps: PropTypes.array
  };

  static defaultProps = {
    steps: []
  };

  render() {
    const { steps } = this.props;

    return (
      <div className="steps-list">
      <h3>Steps List</h3>
      {steps.map((item, index) => {
        return (<p key={index}>{item.title}</p>);
      })}
      </div>
    );
  }
}
