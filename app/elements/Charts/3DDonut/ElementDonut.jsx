import css from './ElementDonut.styl';

import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import Donut3D from './3DDonut.js';

const salesData=[
  { label:"Basic", color:"#3366CC" },
  { label:"Plus", color:"#DC3912" },
  { label:"Lite", color:"#FF9900" },
  { label:"Elite", color:"#109618" },
  { label:"Delux", color:"#990099" }
];

export default class ElementDonut extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  static defaultProps = {
    data: []
  };

  componentDidMount() {
    const { data } = this.props;

    Donut3D.draw('donut', data, 150, 150, 130, 100, 30, 0.4);
  }

  render() {

    return (
      <div className={CN(css.elementDonut)}>
        ChartComponent
        <svg width="700" height="300">
          <g id="donut"></g>
        </svg>
      </div>
    );
  }
}
