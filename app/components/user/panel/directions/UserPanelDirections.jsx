import css from './UserPanelDirections.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import SvgIcon from 'SVGIcon/SVGIcon';

export default class UserPanelDirections extends Component {

  static propTypes = {
    directions: PropTypes.array,
    user: PropTypes.object,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    directions: [],
    user: {}
  };

  displayDirections(user, directions) {
    let template;

    if (directions.length > 0) {
      template = directions.map((item) => {
        const link = item.slug || item.id;

        return (<Link key={item.id} className="panel-item" to={`/${user.nick}/directions/${link}`}>
          {item.title}
        </Link>);
      });
    }
    else {
      template = (
        <div className="empty-list">
          <h3>The list is empty</h3>
        </div>
      );
    }

    return template;
  }

  render() {
    const { title, icon, directions, user } = this.props;
    const directionsList = this.displayDirections(user, directions);

    return (
      <div className={CN(css.userPanelDirections, 'Card')}>
        <div className="title-panel">
          <SvgIcon icon={icon} />
          <p>{title}</p>
        </div>
        <div className="panel-items">
          {directionsList}
        </div>
      </div>
    );
  }
}
