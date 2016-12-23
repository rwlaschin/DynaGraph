import React from 'react';
// import PubSub from 'pubsub-js'
import 'react-dom';
// import { Dropdown, Icon, Input } from 'semantic-ui-react'

module.exports = React.createClass({
  render: function() {
    return <div />;
  },
  getInitialState: function() {
    return {
      name: 'BarChart',
      value: '' // start empty, need to pull from teh Dropdown
    }
  },
  componentDidMount: function() {
  },
  componentDidUnMount: function() {
  }
});
