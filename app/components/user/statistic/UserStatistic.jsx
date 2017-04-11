import css from './UserStatistics.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { getUserStatistics } from 'actions/users';

import Donut from 'Charts/3DDonut/ElementDonut';
import BarChart from 'Charts/Bar/ElementBarChart';
import Select from 'Select/ElementSelect';

import SvgIcon from 'SVGIcon/SVGIcon';

export class UserStatistic extends Component {

  state = {
    loaded: false,
    currentChart: 'pie',
    currentScope: 'directions'
  };

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    user: {},
    dispatch: () => {}
  };

  componentWillMount() {
    const user = this.props.user;

    this.loadStatistics(user);
  }

  componentWillReceiveProps(props) {
    const user = props.user;

    this.loadStatistics(user);
  }

  loadStatistics(user) {
    if (!user.isEmpty && !this.state.loaded) {
      this.props.dispatch(getUserStatistics(user.nick));
      this.setState({ loaded: true });
    }
  }

  renderDonut(user, scope) {
    if (user.statistics) {
      const id = `${scope}_pie`;

      return (
        <Donut data={user.statistics[scope]} id={id} />
      );
    }
  }

  changeChart(id) {
    this.setState({ currentChart: id });
  }

  renderBar(user, scope) {
    if (user.statistics) {
      const id = `${scope}_bar`;

      return (
        <BarChart data={user.statistics[scope]} id={id} />
      );
    }
  }

  activeButton(name) {
    return this.state.currentChart === name;
  }

  renderSwitcher(icon, id) {
    return (
      <a onClick={() => this.changeChart(id)}>
        <SvgIcon className={CN('button-icon', { active: this.activeButton(id) })} icon={icon} />
      </a>
    );
  }

  renderChart(user) {
    const { currentChart, currentScope } = this.state;
    let template;

    switch (currentChart) {
      case 'bar':
        template = this.renderBar(user, currentScope);
        break;
      case 'pie':
        template = this.renderDonut(user, currentScope);
        break;
      default: break;
    }

    return template;
  }

  componentWillUnmount() {
    this.setState({ loaded: false });
  }

  changeSelect(event) {
    let lastState = this.state;

    lastState.currentScope = event.target.value;
    this.setState(lastState);
  }

  selectData(user) {
    if (user.statistics) {
      return Object.keys(user.statistics).map((item) => {
        return { title: item, value: item };
      });
    }
  }

  render() {
    const { user } = this.props;

    const chart = this.renderChart(user);
    const pieChartButton = this.renderSwitcher('pie_chart_icon', 'pie');
    const barChartButton = this.renderSwitcher('bar_chart_icon', 'bar');
    const selectData = this.selectData(user);

    return (
      <div className={CN(css.userStatistics)}>
        <div className="switchers">
          {pieChartButton}
          {barChartButton}
          <Select
            ref="scope"
            name="scope"
            values={selectData}
            onChange={this::this.changeSelect} />
        </div>
        {chart}
      </div>
    );
  }
}

/**
 * Mapping application state to properties
 * @param  {Object} state Application state
 * @return {Object} Mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.users.show
  };
}

export default connect(mapStateToProps)(UserStatistic);
