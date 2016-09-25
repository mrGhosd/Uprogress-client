import css from './UserUpdatesBlock.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import UserUpdatesItem from 'user/updates/item/UserUpdatesItem';
import SvgIcon from 'SVGIcon/SVGIcon';

export default class UserUpdatesBlock extends Component {

  static propTypes = {
    title: PropTypes.string,
    updates: PropTypes.array,
    user: PropTypes.object
  };

  static defaultProps = {
    title: '',
    updates: [],
    user: {}
  };

  render() {
    const { title, updates, user } = this.props;
    const humanizedDate = moment(title).format('LL');
    
    return (
      <div className={CN(css.userUpdatesBlock)}>
        <div className="title">
          <SvgIcon icon="date-icon" />
          <p>{humanizedDate}</p>
        </div>
        <div className="updates-list">
          {updates.map((item) => {
            return <UserUpdatesItem key={item.id} user={user} update={item} />;
          })}
        </div>
      </div>
    );
  }
}
