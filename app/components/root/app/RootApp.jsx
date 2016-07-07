import React, { Component } from 'react';
import RootHeader from 'root/header/RootHeader';

export default class RootApp extends Component {
  render() {
    return (
      <div>
        <RootHeader />
        Root component
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
