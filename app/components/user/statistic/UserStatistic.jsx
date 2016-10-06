import css from './UserStatistics.styl';

import CN from 'classnames';
import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { getUserStatistics } from 'actions/users';

import Donut from 'Charts/3DDonut/ElementDonut';
import BarChart from 'Charts/Bar/ElementBarChart';

import SvgIcon from 'SVGIcon/SVGIcon';

export class UserStatistic extends Component {

  state = {
    loaded: false,
    currentChart: 'pie'
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

  renderDonut(user) {
    if (user.statistics) {
      return (
        <Donut data={user.statistics.directions} />
      );
    }
  }

  changeChart(id) {
    this.setState({ currentChart: id });
  }

  renderBar(user) {
    if (user.statistics) {
      return (
        <BarChart data={user.statistics.directions} />
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

  componentWillUnmount() {
    this.setState({ loaded: false });
  }

  render() {
    const { user } = this.props;
    const donut = this.renderDonut(user);
    const bar = this.renderBar(user);
    const pieChartButton = this.renderSwitcher('pie_chart_icon', 'pie');
    const barChartButton = this.renderSwitcher('bar_chart_icon', 'bar');

    return (
      <div className={CN(css.userStatistics)}>
        UserStatistic
        {pieChartButton}
        {barChartButton}
        {donut}
        {bar}
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
