import css from './StepsListItem.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import CheckBox from 'CheckBox/ElementCheckBox';

export default class StepsListItem extends Component {

  static propTypes = {
    step: PropTypes.object
  };

  static defaultProps = {
    step: {}
  };

  displayCheckbox() {

  }

  displayTitle() {

  }

  render() {
    const { step } = this.props;

    return (
      <div className={CN(css.stepsListItem)}>
        <CheckBox checked={step.is_done} />
        <div>{step.title}</div>
      </div>
    );
  }
}
