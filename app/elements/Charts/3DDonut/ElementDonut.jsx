import css from './ElementDonut.styl';

import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import Donut3D from './3DDonut.js';
import drawPie from './Pie.js';

export default class ElementDonut extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  static defaultProps = {
    data: []
  };

  componentDidMount() {
    const { data } = this.props;
    
    drawPie('donut', data, 370, 520);
    // Donut3D.draw('donut', data, 200, 200, 130, 100, 30, 0.4);
  }

  render() {

    return (
      <div className={CN(css.elementDonut)}>
        <svg id="donut">
        </svg>
      </div>
    );
  }
}
