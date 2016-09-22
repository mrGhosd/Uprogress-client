import css from './WidgetTab.styl';

import CN from 'classnames';
import React, { Component } from 'react';

import WidgetTab from 'widget/tab/item/WidgetTabItem';

export default class WidgetTabs extends Component { // eslint-disable-line react/no-multi-comp

  static propTypes = {
    linkParams: React.PropTypes.object,
    className: React.PropTypes.string,
    route: React.PropTypes.any,
    routeKey: React.PropTypes.any,
    tabs: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    className: '',
    routeKey: '',
    linkParams: {}
  }

  /**
   * Render
   */
  render() {
    const tabs = this.props.tabs;

    if (typeof tabs !== 'object' || Object.keys(tabs).length < 1) {
      throw new Error('WidgetTabs needs prop tabs as Object!');
    }

    const linkParams = this.props.linkParams;
    const className = this.props.className;
    const route = this.props.route;
  
    return (
      <div className={CN(css.widgetTabs, className)}>
        <ul className="nav-bar">
          {Object.keys(tabs).map((route) => <WidgetTab route={route} key={route} text={tabs[route]} linkParams={linkParams} />)}
        </ul>
      </div>
    );
  }
}
