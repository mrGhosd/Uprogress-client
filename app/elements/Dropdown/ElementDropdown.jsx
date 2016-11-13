import css from './ElementDropdown.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class ElementDropdown extends Component {

  state = {
    active: false
  };

  static propTypes = {
    items: PropTypes.array,
    children: PropTypes.object
  };

  static defaultProps = {
    items: [],
    title: {}
  }

  renderItems() {
    const { items } = this.props;
    const { active } = this.state;
    let list = [];

    if (items.length > 0) {
      list = (
        <ul className={CN('list', { active })}>
          {items.map((item, index) => {
            return <li key={index}>{item.value}</li>;
          })}
        </ul>
      );
    }

    return list;
  }

  dropdownClick() {
    let prevState = this.state;

    prevState.active = !prevState.active;
    this.setState(prevState);
  }

  render() {
    let { children } = this.props;
    const itemsList = this.renderItems();

    if (children) {
      children = React.cloneElement(children, { onClick: this.dropdownClick.bind(this) });
    }

    return (
      <div className={CN(css.elementDropdown)}>
        {!children.isEmpty && children}
        {itemsList}
      </div>
    );
  }
}
