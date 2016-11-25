import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
import { Icon, Input } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import Adapter from '../Adapter.js';

// sending events
// PubSub.publish(event,message)

module.exports = React.createClass({
  render: function() {
    var value = this.state.value;
    var current = this.state.current;
    var adapters = this.state.adapters;
    return (
      <Input
        label={ <Dropdown defaultValue={current.text} options={ adapters } onChange={this.handleAdapterChange} /> }
        labelPosition='left'
        placeholder='Query ...'
        icon={ <Icon name='search' inverted circular link onClick={this.handleClick}/> }
        onChange={ this.handleChange }
        value={ value }
        style={ { width:"80%","minWidth":"400px" } }
      />
    );
  },
  propTypes: { },
  getDefaultProps : function() { return { }; },
  getInitialState: function() {
    return {
      name: 'QueryEntry',
      current: Adapter.getCurrent.entry(),
      adapters: Adapter.getEntries(),
      value: ""
    }
  },
  componentDidMount: function() {
  },
  componentDidUnMount: function() {
    try {
      var i=this.subscribers.length - 1;
      for(;i>=0;i--) {
        PubSub.unsubscribe( this.subscribers[i]);
      }
    } catch (e) {}
  },
  handleSubscribers : function(msg, data) {
    switch(msg) {
      default: break;
    }
  },
  handleAdapterChange : function(event) {
    Adapter.setAdapter( event.target.textContent );
    this.setState( { adapter: Adapter.getCurrent.entry() } );
  },
  handleChange: function(event) {
    this.setState( { value: event.target.value } );
  },
  handleClick: function(event) {
    // I'm a form
    console.info(this.state.value)
  },
});
