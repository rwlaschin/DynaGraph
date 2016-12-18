import React from 'react';
import PubSub from 'pubsub-js'
import 'react-dom';
// import { Icon, Input, Label, Dropdown, Form, List } from 'semantic-ui-react'

import BarChart from "./widgets/BarChart";
import BubbleChart from "./widgets/BubbleChart";
import Chart from "./widgets/Chart";
import Donut from "./widgets/Donut";
import Gauge from "./widgets/Gauge";
import GeoChart from "./widgets/GeoChart";
import Json from "./widgets/Json";
import LineChart from "./widgets/LineChart";
import Metric from "./widgets/Metric";
import Pie from "./widgets/Pie";
import Polar from "./widgets/Polar";
import Scales from "./widgets/Scales";
import Table from "./widgets/Table";

module.exports = React.createClass({
  render: function() {
    // var self=this;
    // search, if I have a valid response draw a tabbed panel with different formats.
    // Saved chart objects and positions
    // scroll bar
    return (
      <div>

      </div>
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
