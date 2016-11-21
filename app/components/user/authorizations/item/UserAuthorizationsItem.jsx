import css from './UserAuthorizationsItem.styl';
import CN from 'classnames';

import SvgIcon from 'SVGIcon/SVGIcon';

import React, { Component, PropTypes } from 'react';

import { getClientIcon,  getOSIcon } from 'utils/iconsForAuthoirzations.js';

export default class UserAuthorizationsItem extends Component {

  static propTypes = {
    authorization: PropTypes.object
  };

  static defaultProps = {
    authorization: {}
  };

  render() {
    const { authorization } = this.props;
    console.log(authorization);

    return (
      <div className={CN(css.userAuthorizationsItem, 'Card')}>
        <div className="client block">
          <SvgIcon icon={getClientIcon(authorization)} />
          <div className="info">
            <span>{authorization.appName}</span>
            <span>{authorization.appVersion}</span>
          </div>
        </div>

        <div className="os block">
          <SvgIcon icon={ getOSIcon(authorization)} />
            <div className="info">
              <span>{authorization.platform}</span>
              <span>{authorization.platformVersion}</span>
            </div>
        </div>
        <div className="provider block">

        </div>
      </div>
    );
  }
}
