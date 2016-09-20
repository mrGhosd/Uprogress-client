import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DirectionsList from 'directions/list/DirectionsList';

class Dashboard extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    directions: PropTypes.object,
    params: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {},
    directions: {},
    params: {}
  };

  render() {
    const { directions } = this.props;

    return (
      <div className="dashboard">
        <DirectionsList directions={directions.list} />
      </div>
    );
  }
}

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return { direction: state.directions.list };
}

export default connect(mapStateToProps)(Dashboard);
