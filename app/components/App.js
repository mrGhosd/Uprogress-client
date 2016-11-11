import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions';
import RootApp from 'components/root/app/RootApp.jsx';

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    directions: state.directions,
    steps: state.steps,
    users: state.users,
    loaders: state.loaders
  };
}

/**
 * Mapping properties to further dispath
 * @param  {Function} dispatch Dispatch function
 * @return {Object} Dispatched properties
 */
function mapToDispatchProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapToDispatchProps)(RootApp);

export default App;
