import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getList } from 'actions/directions';

import DirectionsForm from 'directions/form/DirectionsForm';

class DirectionsList extends Component {

  componentWillMount() {
    this.props.dispatch(getList());
  }

  render() {
    const { directions } = this.props;
    const list = directions.list || [];
    return (
      <div className="directions">
        <div className="directions-list">
          {list.map((item, index) => {
            return (
              <div className="direction-item" key={index}>
                  <p>{item.title}</p>
              </div>
            )
          })}
        </div>
        <DirectionsForm />
      </div>
    );
  }
}
export default connect()(DirectionsList)
