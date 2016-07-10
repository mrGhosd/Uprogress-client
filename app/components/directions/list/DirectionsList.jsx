import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getList } from 'actions/directions';

class DirectionsList extends Component {

  componentWillMount() {
    this.props.dispatch(getList());
  }

  render() {
    const { directions } = this.props;
    const list = directions.list || [];
    return (
      <div className="directions-list">
        {list.map((item, index) => {
          return (<p key={index}>{item.title}</p>)
        })}
      </div>
    );
  }
}
export default connect()(DirectionsList)
