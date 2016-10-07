import css from './ElementDonut.styl';

import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import Donut3D from './3DDonut.js';
import drawPie from './Pie.js';

export default class ElementDonut extends Component {
  static propTypes = {
    data: PropTypes.array,
    id: PropTypes.string.isRequired
  };

  static defaultProps = {
    data: []
  };

  componentDidMount() {
    this.renderPie();
  }

  componentWillReceiveProps() {
    this.renderPie();
  }

  renderPie() {
    const { data, id } = this.props;

    drawPie(id, data, 370, 520);
  }

  render() {
    const { id } = this.props;

    return (
      <div className={CN(css.elementDonut)}>
        <svg id={id} >
        </svg>
      </div>
    );
  }
}
