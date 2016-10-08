import css from './ElementBarChart.styl';

import CN from 'classnames';
import BarChart from './BarChart';

import React, { Component, PropTypes } from 'react';

export default class ElementBarChart extends Component {
  static propTypes = {
    data: PropTypes.array,
    id: PropTypes.string
  };

  static defaultProps = {
    data: [],
    id: ''
  };

  componentWillReceiveProps(props) {
    this.renderBar(props);
  }

  componentDidMount() {
    this.renderBar(this.props);
  }

  renderBar(props) {
    const { data, id } = props;

    BarChart.draw(css.barChart, id, data);
  }

  render() {
    return (
      <div className={CN(css.barChart)}>
        <svg id="barChart" width="960" height="500"></svg>
      </div>
    );
  }
}
