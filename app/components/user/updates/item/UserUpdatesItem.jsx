import css from './UserUpdatesItem.styl';

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

export default class UserUpdatesItem extends Component {

  static propTypes = {
    update: PropTypes.object,
    user: PropTypes.object
  };

  static defaultProps = {
    update: {},
    user: {}
  };

  actionName(update) {
    let name = update.operation;

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  objectName(update) {
    let klassName = update.data.klass;

    return klassName.charAt(0).toLowerCase() + klassName.slice(1);
  }

  operationObjectName(user, update) {
    let objectAttributes = this.getObjectAttributes(update);

    return this.createLinkToObject(user, objectAttributes);
  }

  getObjectAttributes(update) {
    let objectAttributes;

    switch (update.operation) {
      case 'create':
        objectAttributes = update.data.attributes;
        break;
      case 'update':
        objectAttributes = update.data.new_attributes;
        break;
      case 'destroy':
        objectAttributes = update.data.attributes;
        break;
      default:
        break;
    }

    return objectAttributes;
  }

  createLinkToObject(user, attributes) {
    if (!user.isEmpty) {
      return (
        <Link to={`/${user.nick}/directions/${attributes.slug || attributes.id}`}>{attributes.title}</Link>
      );
    }
  }

  displayAction(user, update) {
    const actionName = this.actionName(update);
    const objectName = this.objectName(update);
    const link = this.operationObjectName(user, update);

    return (
      <div className={css.userUpdatesItem}>
        <span>{actionName}</span>
        <span>{objectName}</span>
        {link}
      </div>
    );
  }

  render() {
    const { update, user } = this.props;
    const action = this.displayAction(user, update);

    return action;
  }
}
