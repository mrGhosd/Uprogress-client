import css from './UserPanelDirections.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';

import SvgIcon from 'SVGIcon/SVGIcon';

export default class UserPanelDirections extends Component {

  static propTypes = {
    directions: PropTypes.array,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    directions: [],
  };

  render() {
    const { title, icon } = this.props;

    return (
      <div className={CN(css.userPanelDirections, 'Card')}>
        <div className="title-panel">
          <SvgIcon icon={icon} />
          <p>{title}</p>
        </div>
      </div>
    );
  }
}
