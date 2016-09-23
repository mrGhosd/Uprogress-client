import css from './UserPanel.styl';

import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import Image from 'Image/ElementImage';
import SvgIcon from 'SVGIcon/SVGIcon';

export default class UserPanel extends Component {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    user: {},
    dispatch: () => {}
  };

  displayImage(user) {
    let image;

    if (user.isEmpty) {
      image = <SvgIcon icon="empty-user" />;
    }
    else {
      image = <Image size={200} className="avatar-image" src={user.attachment.url} />;
    }

    return image;
  }

  render() {
    let { user } = this.props;
    const image = this.displayImage(user);

    return (
      <div className={CN(css.userPanel)}>
        {image}
      </div>
    );
  }
}
