import css from './Navigation.styl';

import React, { Component } from 'react';
import CN from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getList } from 'actions/directions';


function mapStateToProps(state) {
  return { directions: state.directions.list };
}

class Navigation extends Component {

  componentWillMount() {
    this.props.dispatch(getList());
  }

  render() {
    const { directions } = this.props;
    return (
      <div className={CN(css.navigation, 'Card', 'divine')}>
        <Link to='/directions/new' className="create-button">Add</Link>
        {directions.map((item, index) => {
          return (
            <Link className="navigation-item" key={index} to={`/directions/${item.id}`}>{item.title}</Link>
          )
        })}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Navigation);
