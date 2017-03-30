import css from './LandingMobile.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import { getProduct } from 'utils/browser';

import { connect } from 'react-redux';
import SVGIcon  from 'SVGIcon/SVGIcon';
import Button from 'Button/ElementButton';

export class LandingMobile extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    currentUser: PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    currentUser: {}
  };

  getDetailInfo() {
    let object = {};

    if (getProduct() == 'iPhone') {
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

  skipLanding() {
    const { currentUser } = this.props;

    localStorage.setItem('hideMobileLanding', true);
    if (!currentUser.isEmpty) {
      this.context.router.push(`/${currentUser.nick}`);
    }
    else {
      this.context.router.push('/sign_in');
    }
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
          <Button color="blue" onClick={this::this.skipLanding}>
            Continue with web version
          </Button>
        </div>
      </div>
    );
  }
}

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    currentUser: state.users.current
  };
}

export default connect(mapStateToProps)(LandingMobile);
