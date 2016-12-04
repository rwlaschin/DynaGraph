import React from 'react';
import QueryEntry from './QueryEntry';
import ChartChooser from './ChartChooser';
import Dashboard from './Dashboard';

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <QueryEntry/>
        <ChartChooser/>
        <Dashboard/>
      </div>
    )
  }
});
