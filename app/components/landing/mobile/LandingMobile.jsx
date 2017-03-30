import css from './LandingMobile.styl';
import CN from 'classnames';
import { getProduct } from 'utils/browser';

import React, { Component } from 'react';
import SVGIcon  from 'SVGIcon/SVGIcon';

export default class LandingMobile extends Component {

  getDetailInfo() {
    let object = {};

    if (getProduct() == 'iOS') {
      object['link'] = 'https://itunes.apple.com/us/app/u-progress/id1219463214?mt=8';
      object['shop'] = 'App Store';
      object['icon'] = 'app_store_icon';
    }
    else {
      object['link'] = 'https://play.google.com/store/apps/details?id=vsokoltsov.uprogress';
      object['shop'] = 'Play Store';
      object['icon'] = 'play_store_icon';
    }

    return object;
  }

  render() {
    const { shop, link, icon } = this.getDetailInfo();

    return (
      <div className={CN(css.landingMobile)}>
        <div className="landing-wrapper">
          <a href={link}>
            <SVGIcon icon={icon} />
          </a>
          <p className="base-title">Get UProgress app in {shop}</p>
        </div>
      </div>
    );
  }
}
