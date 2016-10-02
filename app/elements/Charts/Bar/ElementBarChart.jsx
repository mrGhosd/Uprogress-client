import css from './ElementBarChart.styl';

import CN from 'classnames';
import BarChart from './BarChart';

import React, { Component, PropTypes } from 'react';

export default class ElementBarChart extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  static defaultProps = {
    data: []
  };

  componentDidMount() {
    const { data } = this.props;

    BarChart.draw('barChart', data);
  }

  render() {
    return (
      <div className={CN(css.barChart)}>
        <svg id="barChart" width="960" height="500"></svg>
      </div>
    );
  }
}
