import React, { Component } from 'react'
import './resources/app.css'
import { GraphComponent, GraphEditorInputMode, License, Point, Rect, ICommand,} from 'yfiles'
import yFilesLicense from '../../license.json'
import NetworkMonitoringDemo  from './NetworkMonitoringDemo.js';
import UIComponent from './UIComponent';

export default class ReactGraphComponent extends Component {
    constructor(props) {
      super(props)
      // instantiate a new GraphComponent
      this.graphComponent = new GraphComponent()
    }
  
    componentDidMount() {
      // append the GraphComponent to the DOM
      this.div.appendChild(this.graphComponent.div)
  
      NetworkMonitoringDemo(this.graphComponent, yFilesLicense)
    }


  
    render() {
      return (
        <> 
        <UIComponent/>
        <div className="graph-component-container" ref={(node) => {this.div = node}}/>
        </>
      )
    }
  }
  