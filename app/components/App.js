import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/directions';
import RootApp from 'components/root/app/RootApp.jsx';

function mapStateToProps(state) {
  console.log(state);
  return {
    directions: state.directions
  };
}

function mapToDispatchProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapToDispatchProps)(RootApp);

export default App;
