import React, { Component } from 'react';
import { Link } from 'react-router';

export default class WidgetTab extends Component {

  static propTypes = {
    linkParams: React.PropTypes.object,
    route: React.PropTypes.any,
    text: React.PropTypes.any
  }

  static defaultProps = {
  }

  render() {
    return (
      <li>
        <Link to={this.props.route} activeClassName="active">
          <svg className="left"><path fill="#f6f7f8" d="M0,4h4V0C4,2.2,2.2,4,0,4z"/></svg>
          <span>{this.props.text}</span>
          <svg className="right"><path fill="#f6f7f8" d="M4,4H0l0-4C0,2.2,1.8,4,4,4z"/></svg>
        </Link>
      </li>
    );
  }
}
