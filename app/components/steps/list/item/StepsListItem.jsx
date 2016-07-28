import React, { Component, PropTypes } from 'react';

export default class StepsListItem extends Component {

  static propTypes = {
    step: PropTypes.object
  };

  static defaultProps = {
    step: {}
  };

  render() {
    const { step } = this.props;
    
    return (
      <div>
        <p>{step.title}</p>
      </div>
    );
  }
}
