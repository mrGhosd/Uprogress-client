import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getList } from 'actions/directions';

class DirectionsList extends Component {

  componentWillMount() {
    this.props.dispatch(getList());
      // console.log(this);
  }

  render() {
    console.log(this.props);
    return (
      <div className="directions-list">
        List
      </div>
    );
  }
}
export default connect()(DirectionsList)
