import css from './UserAuthorizationsItem.styl';
import CN from 'classnames';

import SvgIcon from 'SVGIcon/SVGIcon';

import React, { Component, PropTypes } from 'react';

import { getIcon } from 'utils/iconsForAuthoirzations.js';

export default class UserAuthorizationsItem extends Component {

  static propTypes = {
    authorization: PropTypes.object
  };

  static defaultProps = {
    authorization: {}
  };

  render() {
    const { authorization } = this.props;

    return (
      <div className={CN(css.userAuthorizationsItem, 'Card')}>
        <SvgIcon icon={getIcon(authorization)} />
        {authorization.appName}
      </div>
    );
  }
}
