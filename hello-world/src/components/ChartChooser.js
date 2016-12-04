import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
// import { Icon, Input, Label, Dropdown, Form, List } from 'semantic-ui-react'

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
