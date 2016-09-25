import React, { Component, PropTypes } from 'react';

export default class UserUpdatesItem extends Component {

  static propTypes = {
    update: PropTypes.object
  };

  static defaultProps = {
    update: {}
  };

  render() {
    const { update } = this.props;
    console.log(update);
    return (
      <div>UserUpdatesItem</div>
    );
  }
}
