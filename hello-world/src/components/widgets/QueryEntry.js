import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
import { Dropdown, Icon, Input } from 'semantic-ui-react'
import '../Adapter.js';

// Load dynamically from AdapterComponent
const _Adapters = [
  // { text: 'Zenoss', value: 'Zenoss' },
  // { text: 'MySql', value: 'MySql' }
]


// sending events
// PubSub.publish(event,message)

module.exports = React.createClass({
  render: function() {
    var value = this.state.value;
    return (
      <Input
        label={ <Dropdown defaultValue='Zenoss' options={_Adapters} onChange={this.handleAdapterChange} /> }
        labelPosition='left'
        placeholder='Query ...'
        icon={ <Icon name='search' inverted circular link onClick={this.handleClick}/> }
        onChange={ this.handleChange }
        value={ value }
        style={ { width:"80%","min-width":"400px" } }
      />
    );
  },
  getInitialState: function() {
    return {
      name: 'QueryEntry',
      value: '' // start empty, need to pull from teh Dropdown
    }
  },
  componentDidMount: function() {
    // var self = this;
    this.subscribers = [
      PubSub.subscribe('AddAdapter',this.handleSubscribers)
    ]
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
      case 'AddAdapter':
        _Adapters.push( { text: data.name, value: data.value } );
        break;
    }
  },
  handleAdapterChange : function(event) {

  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    // I need to call the AdapterCode here to show values
  },
  handleClick: function(event) {
    // I'm a form
    console.info(this.state.value)
  },
});
