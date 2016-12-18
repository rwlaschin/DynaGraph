import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
// import { Icon, Input, Label, Dropdown, Form, List } from 'semantic-ui-react'

// QueryEntry provides
// Query - the query used to procure the data
// Results - (note: timedate should be normalized to unix UTC timestamp)
//  Data Field Definition (int, bool, enum, timestamp)
//  Data - [ row1, row2, row3 ]
// Process
// First - Examine the Query for Key Words and choose matching charts
//         keywords: GroupBy, Compare, Time
//         note: I shouldn't know what kinds of charts do what, pass
//               keywords to charts and have them return if it's valid
//               or not
// Second - Create Tab for each chart type
// Third - Send data to Charts to build chart data
//         try to reuse data so that we don't waste memory
// Forth - Create caching task for data
// What if I pass in an interface for the chart to query data from?
// This way when the chart part of the dashboard, loaded as a tab,
// the process for getting the data is the same.  Just with different
// adapters.

module.exports = React.createClass({
  render: function() {
    // var self=this;
    // floats over the top
    // tabbed, uses query to determine the types of charts that can be used.
    return (
      <div></div>
    );
  },
  propTypes: { },
  getDefaultProps : function() { return { }; },
  getInitialState: function() {
    return {
      name:__filename,
    }
  },
  componentDidMount: function() {
    this.subscribers = [];
  },
  componentDidUnMount: function() {
    try {
      var i=this.subscribers.length - 1;
      for(;i>=0;i--) {
        PubSub.unsubscribe( this.subscribers[i]);
      }
    } catch (e) {}
  }
});
