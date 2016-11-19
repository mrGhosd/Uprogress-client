import css from './PopupNotificationsItem.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';
import { DropNotification } from 'actions/notifications';

import SvgIcon from 'SVGIcon/SVGIcon';

export default class Notification extends Component {

  static propTypes = {
    type: PropTypes.string,
    content: PropTypes.object,
    id: PropTypes.string
  }

  constructor(props, another) {
    super(props, another);

    this.killTimeout = null;
  }

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    content: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    type: 'info'
  }

  state = {
    display: false,
    reduced: false
  }


  componentDidMount() {
    setTimeout(this::this.show, 300);

    // Autokill notification if notification is info
    let result = {};

    if (this.props.type == 'info') {
      result = setTimeout(this::this.hide, 7300);
    }
    else {
      result = setTimeout(this::this.hide, 4000);
    }
    this.killTimeout = result;
  }

  show() {
    this.setState({ display: true });
  }

  hide() {
    clearTimeout(this.killTimeout);
    this.setState({ display: false });

    this.killTimeout = setTimeout(() => {
      // this.setState({ reduced: true });
      DropNotification(this.props.id);
    }, 500);
  }

  /**
   * Render component
   */
  render() {
    const { type, content } = this.props;

    return (
      <div className={CN(css.Notification, type, { Display: this.state.display, Reduced: this.state.reduced })}>
        <div className="NotifContent">
          <div className="NotifTitle">{content.title}</div>
          <div className="NotifDescription">{content.text}</div>
        </div>
        <div className="CloseButton" onClick={this::this.hide}>
          <SvgIcon icon="close" />
        </div>
      </div>
    );
  }
}
