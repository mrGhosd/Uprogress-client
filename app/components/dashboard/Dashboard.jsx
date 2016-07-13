import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getList } from 'actions/directions';

import DirectionsList from 'directions/list/DirectionsList';

class Dashboard extends Component {

  componentWillMount() {
    this.props.dispatch(getList());
  }

  render() {
    const { directions } = this.props;
    return (
      <div className="dashboard">
        <DirectionsList directions={directions.list} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { direction: state.directions.list };
}

export default connect(mapStateToProps)(Dashboard);
