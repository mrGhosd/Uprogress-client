import css from './ElementDropdown.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';
import DropdownMenu from 'react-dd-menu';

export default class ElementDropdown extends Component {

  state = {
    active: false
  };

  static propTypes = {
    items: PropTypes.array,
    children: PropTypes.array,
    titleElement: PropTypes.object
  };

  static defaultProps = {
    items: [],
    children: [],
    titleElement: {}
  }

  close() {
    this.setState({ active: false });
  }

  toggle() {
    let prevState = this.state;

    prevState.active = !prevState.active;
    this.setState(prevState);
  }

  click() {
    console.log('You clicked an item');
  }

  render() {
    let { children, titleElement } = this.props;

    if (titleElement) {
      titleElement = React.cloneElement(titleElement, { onClick: this.toggle.bind(this) });
    }

    const menuOptions = {
      isOpen: this.state.active,
      close: this.close.bind(this),
      toggle: titleElement
    };
    let data = (
      <div>
        <li><a href="#">Example 1</a></li>
        <li><button type="button">Example 2</button></li>
      </div>
    );

    return (
      <div className={CN(css.elementDropdown)}>
        <DropdownMenu isOpen={this.state.active} close={menuOptions.close} toggle={menuOptions.toggle}>
          {children}
        </DropdownMenu>
      </div>
    );
  }
}
