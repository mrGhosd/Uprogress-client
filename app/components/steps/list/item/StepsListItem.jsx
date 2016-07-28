import css from './StepsListItem.styl';
import CN from 'classnames';

import React, { Component, PropTypes } from 'react';

import CheckBox from 'CheckBox/ElementCheckBox';

export default class StepsListItem extends Component {

  state = {
    step: {
      is_done: false
    }
  };

  static propTypes = {
    step: PropTypes.object
  };

  static defaultProps = {
    step: {}
  };

  componentWillMount() {
    this.setState({ step: this.props.step });
  }

  handleChanges(event) {
    let state = this.state.step;
    
    state[event.target.name] = Boolean(event.target.type.match(/text/)) ? event.target.value : event.target.checked;
    this.setState({ step: state });
  }

  displayCheckbox() {

  }

  displayTitle() {

  }

  render() {
    let { step } = this.state;

    return (
      <div className={CN(css.stepsListItem)}>
        <CheckBox name="is_done"
          checked={step.is_done}
          onChange={ this::this.handleChanges }/>
        <div>{step.title}</div>
      </div>
    );
  }
}
