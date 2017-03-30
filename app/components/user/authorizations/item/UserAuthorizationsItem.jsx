import css from './UserAuthorizationsItem.styl';
import CN from 'classnames';

import SvgIcon from 'SVGIcon/SVGIcon';
import LogoIcon from 'SVGIcon/LogoIcon';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { removeAuthorization } from 'actions/users';
import { getClientIcon,  getOSIcon } from 'utils/iconsForAuthoirzations.js';

export default class UserAuthorizationsItem extends Component {

  static propTypes = {
    authorization: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    authorization: {},
    dispatch: () => {}
  };

  destroyAuth(id) {
    this.props.dispatch(removeAuthorization(id));
  }

  chooseIcon(client) {
    if (client === 'uprogress_auth_icon') {
      return <LogoIcon />;
    }
    else {
      return <SvgIcon icon={client} />;
    }
  }

  render() {
    const { authorization } = this.props;

    return (
      <div className={CN(css.userAuthorizationsItem, 'Card')}>
        <div className="client block">
          {this.chooseIcon(getClientIcon(authorization))}
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
        <div className="actions block">
          <Link onClick={() => this.destroyAuth(authorization.id)}>
            <SvgIcon icon="minus_icon" />
          </Link>
        </div>
      </div>
    );
  }
}
