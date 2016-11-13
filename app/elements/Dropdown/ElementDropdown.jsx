import React, { Component, PropTypes } from 'react';

export default class ElementDropdown extends Component {

  static propTypes = {
    items: PropTypes.array,
    children: PropTypes.object
  };

  static defaultProps = {
    items: [],
    title: {}
  }

  renderItems() {
    const items = this.props.items;
    let list = [];

    if (items.length > 0) {
      list = (
        <ul className="list">
          {items.map((item, index) => {
            return <li key={index}>{item.value}</li>;
          })}
        </ul>
      );
    }

    return list;
  }

  render() {
    const { children } = this.props;
    const itemsList = this.renderItems();

    return (
      <div>
        {!children.isEmpty && children}
        {itemsList}
      </div>
    );
  }
}
