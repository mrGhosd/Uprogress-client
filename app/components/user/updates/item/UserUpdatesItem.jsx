import css from './UserUpdatesItem.styl';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SvgIcon from 'SVGIcon/SVGIcon';

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

    return this.createLinkToObject(user, objectAttributes, update);
  }

  getObjectAttributes(update) {
    let objectAttributes;

    switch (update.operation) {
      case 'create':
        objectAttributes = update.data.attributes;
        break;
      case 'update':
        objectAttributes = update.data.newAttributes;
        break;
      case 'destroy':
        objectAttributes = update.data.attributes;
        break;
      default:
        break;
    }

    return objectAttributes;
  }

  getIconName(update) {
    let iconName;

    switch (update.operation) {
      case 'create':
        iconName = 'new-updates-icon';
        break;
      case 'update':
        iconName = 'edit-updates-icon';
        break;
      case 'destroy':
        break;
      default:
        break;
    }

    return iconName;
  }

  getCorrectLinkUrl(attributes, update) {
    let url;

    if (update.data.klass === 'Step') {
      url = this.stepID(update.operation, attributes);
    }
    else {
      url = this.directionID(update.operation, attributes);
    }

    return url;
  }

  directionID(operation, attributes) {
    let id;

    if (operation === 'create') {
      id = attributes.slug || attributes.id;
    }
    else {
      id = attributes.slug || attributes.id;
    }

    return id;
  }

  stepID(operation, attributes) {
    let id;

    if (operation === 'create') {
      id = attributes.directionId;
    }
    else {
      id = attributes.directionId;
    }
    return id;
  }

  createLinkToObject(user, attributes, update) {
    if (!user.isEmpty) {
      const url = this.getCorrectLinkUrl(attributes, update);

      return (
        <Link to={`/${user.nick}/directions/${url}`}>{attributes.title}</Link>
      );
    }
  }

  getIconForAction(update) {
    const iconName = this.getIconName(update);

    return <SvgIcon icon={iconName} />;
  }

  isItUpdatingStepStatus(update) {
    if (update.operation === 'update' &&
        update.data.klass === 'Step' &&
        update.data.attributesDifference.hasOwnProperty('isDone')) {
      return true;
    }
  }

  displayStepIcon(update) {
    let icon;

    if (update.data.attributesDifference.isDone) {
      icon = <SvgIcon icon="icon-success" />;
    }
    else {
      icon = <SvgIcon icon="icon-failure" />;
    }

    return icon;
  }

  showStepStatus(update) {
    let status;

    if (update.data.attributesDifference.isDone) {
      status = (<i>done</i>);
    }
    else {
      status = (<i>in progress</i>);
    }
    return status;
  }

  displayStepUpdateAction(action, object, link, update) {
    const icon = this.displayStepIcon(update);
    const status = this.showStepStatus(update);

    return (
      <div className={css.userUpdatesItem}>
        {icon}
        <span>{action}</span>
        <span>{object}</span>
        <span>{link}</span>
        <span>to</span>
        <span>{status}</span>
      </div>
    );
  }

  displayAction(user, update) {
    let template;
    const actionName = this.actionName(update);
    const objectName = this.objectName(update);
    const link = this.operationObjectName(user, update);
    const icon = this.getIconForAction(update);

    if (this.isItUpdatingStepStatus(update)) {
      template = this.displayStepUpdateAction(actionName, objectName, link, update);
    }
    else {
      template = (
        <div className={css.userUpdatesItem}>
          {icon}
          <span>{actionName}</span>
          <span>{objectName}</span>
          {link}
        </div>
      );
    }

    return template;
  }

  render() {
    const { update, user } = this.props;
    const action = this.displayAction(user, update);

    return action;
  }
}
