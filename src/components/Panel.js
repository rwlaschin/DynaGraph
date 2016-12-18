import React from 'react';
import QueryEntry from './QueryEntry';
import ChartChooser from './TabbedChartChooser';
import Dashboard from './Dashboard';

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <QueryEntry/>
        <TabbedChartChooser/>
        <Dashboard/>
      </div>
    )
  }
});
