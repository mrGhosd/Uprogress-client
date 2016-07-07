import React, { Component } from 'react';

export default class RootApp extends Component {
  render() {
    return (
      <div>
        Root component
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
