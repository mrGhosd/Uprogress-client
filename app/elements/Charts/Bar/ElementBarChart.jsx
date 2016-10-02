import React, { Component, PropTypes } from 'react';

export default class ElementBarChart extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  static defaultProps = {
    data: []
  };
  
  render() {
    return (
      <div>BarChart</div>
    );
  }
}
