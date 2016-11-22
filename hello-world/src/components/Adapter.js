import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
// import { Dropdown, Icon, Input } from 'semantic-ui-react'
import Glob from 'glob-js'

// Load dynamically from AdapterComponent
var _Adapters = [
  // { text: 'Zenoss', value: 'Zenoss' },
  // { text: 'MySql', value: 'MySql' }
]

(function() {
  // build the adapter list
  var adapters = glob.readdirSync('./adapters/*.js');
  for()
  require()
})();



// sending events
// PubSub.publish(event,message)

module.exports = React.createClass({
  render: function() {
    var value = this.state.value;
    return (
      <Dropdown defaultValue='Zenoss' options={_Adapters} onChange={this.handleAdapterChange} />
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
  }
});
