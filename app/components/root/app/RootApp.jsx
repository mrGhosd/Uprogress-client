import { Component, PropTypes } from 'react';

import store from 'store';

import { currentUser } from 'actions/users';

/*eslint-disable */
import utilsPolyfill from 'utils/polifyll';
/*eslint-enable */

export default class RootApp extends Component {

  static propTypes = {
    children: PropTypes.object
  };

  static defaultProps = {
    children: {}
  }

  componentWillMount() {
    const token = localStorage.getItem('uprogresstoken');

    if (token) {
      store.dispatch(currentUser());
    }
  }

  render() {
    return this.props.children;
  }
}
