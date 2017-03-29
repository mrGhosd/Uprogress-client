import css from './LandingMobile.styl';
import CN from 'classnames';

import React, { Component } from 'react';
import SvgIcon from 'SVGIcon/SVGIcon';

export default class LandingMobile extends Component {
  render() {
    return (
      <div className={CN(css.landingMobile)}>
        <SvgIcon icon="app_logo" />
        <a href="https://itunes.apple.com/us/app/u-progress/id1219463214?mt=8"></a>
      </div>
    );
  }
}
