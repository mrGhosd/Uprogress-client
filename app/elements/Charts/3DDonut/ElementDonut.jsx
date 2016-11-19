import css from './ElementDonut.styl';

import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import drawPie from './Pie.js';

export default class ElementDonut extends Component {
  static propTypes = {
    data: PropTypes.array,
    id: PropTypes.string
  };

  static defaultProps = {
    data: [],
    id: ''
  };

  componentDidMount() {
    this.renderPie(this.props);
  }

  componentWillReceiveProps(props) {
    this.renderPie(props);
  }

  renderPie(props) {
    const { data, id } = props;

    drawPie(css.elementDonut, id, data, 370, 520);
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
