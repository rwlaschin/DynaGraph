import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
import { Dropdown } from 'semantic-ui-react'

// adapters
import Zenoss from './adapters/Zenoss.js'

// Load dynamically from AdapterComponent
var _Adapters = [];
_Adapters.push( Zenoss.getEntry() );

// sending events
// PubSub.publish(event,message)

module.exports = React.createClass({
  render: function() {
    return (
      <Dropdown defaultValue={_Adapters[0].text} options={_Adapters} onChange={this.handleAdapterChange} />
    );
  },
  getInitialState: function() {
    return {
      name: 'Adapter',
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
  },
  handleadapterChange : function(event) {
    // get the adapter,
    // pass the object through
    PubSub.publish('AdapterChanged', event.currentTarget);
  }

});
