import css from './Navigation.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    directions: state.directions.list,
    user: state.users.show,
    currentUser: state.users.current
  };
}

export class Navigation extends Component {

  static propTypes = {
    directions: PropTypes.array,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    context: PropTypes.object,
    currentUser: PropTypes.object
  };

  static defaultProps = {
    directions: [],
    dispatch: () => {},
    params: {},
    context: {},
    user: {},
    currentUser: {}
  };

  itemSelected(item) {
    let result;

    if (this.props.params && this.props.params.id) {
      const directionId = this.props.params.id;

      result = directionId == item.id || directionId == item.slug;
    }
    return result;
  }

  render() {
    const { directions, user, currentUser } = this.props;
    
    return (
      <div className={CN(css.navigation, 'Card', 'divine')}>
        {currentUser.id === user.id && <Link to={`/${user.nick}/directions/new`} className="create-button">Add</Link>}
        {directions.map((item, index) => {
          return (
            <Link className={CN({ 'navigation-item': true, 'selected': this.itemSelected(item) })}
                  key={index} to={`/${user.nick}/directions/${item.id}`}>
              <span className="title">{item.title}</span>
              {item.percentsResult !== null && <span className="percents-result"> {item.percentsResult}%</span>}
            </Link>
          );
        })}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Navigation);
