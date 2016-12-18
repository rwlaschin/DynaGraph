import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
import { Icon, Input, Label, Dropdown, Form, List } from 'semantic-ui-react'
import Adapter from './Adapter.js';

// sending events
// PubSub.publish(event,message)

module.exports = React.createClass({
  render: function() {
    var self = this;
    var current = this.state.current;
    var adapters = this.state.adapters;
    var value = this.state.value;
    var suggestions = Adapter.getSuggestion(value);
    // search, if I have a valid response draw a tabbed panel with different formats.
    return (
      <Form.Field>
        <Input
          label={ <Dropdown defaultValue={current.text} options={ adapters } onChange={this.handleAdapterChange} /> }
          labelPosition='left'
          placeholder='Query ...'
          icon={ <Icon name='search' inverted circular link onClick={this.handleClick}/> }
          onChange={ this.handleChange }
          value={ value }
          style={ { width:"80%","minWidth":"400px" } }
        />
      { suggestions ? <br/> : '' }
      <Label pointing className="label { suggestions ? '' : 'empty' }">
        <List>{
            suggestions.map(function(value,index){
              return <List.Item key={index} onClick={self.handleSelectItem}>{value}</List.Item>
            })
          }</List>
      </Label>
    </Form.Field>
    );
  },
  propTypes: { },
  getDefaultProps : function() { return { }; },
  getInitialState: function() {
    return {
      name:__filename,
      current: Adapter.getCurrent.entry(),
      adapters: Adapter.getEntries(),
      value: Adapter.update("")
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
    this.setState( { value: Adapter.update(event.target.value) } );
  },
  handleSelectItem: function(event) {
    console.info(this.state.value + " " + event.target.textContent);
    this.setState( {value : (this.state.value + " " + event.target.textContent).replace(/\s+/," ")})
  },
  handleClick: function(event) {
    // I'm a form
    console.info(this.state.value)
  },
});
