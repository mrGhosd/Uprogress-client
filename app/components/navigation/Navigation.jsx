import css from './Navigation.styl';

import React, { Component, PropTypes } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getList } from 'actions/directions';

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    directions: state.directions.list,
    user: state.users.show
   };
}

class Navigation extends Component {

  static propTypes = {
    directions: PropTypes.array,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    context: PropTypes.object
  };

  static defaultProps = {
    directions: [],
    dispatch: () => {},
    params: {},
    context: {},
    user: {}
  };

  componentWillMount() {
    // this.props.dispatch(getList());
  }

  itemSelected(item) {
    let result;

    if (this.props.params && this.props.params.id) {
      result = this.props.params.id == item.id;
    }
    return result;
  }

  render() {
    const { directions, user } = this.props;

    return (
      <div className={CN(css.navigation, 'Card', 'divine')}>
        <Link to={`/${user.nick}/directions/new`} className="create-button">Add</Link>
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
