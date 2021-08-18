import React, { Component } from 'react'
import { GraphComponent, GraphEditorInputMode, License, Point, Rect, ICommand,} from 'yfiles'
import yFilesLicense from '../../license.json'
import NetworkFlowDemo from './NetworkFlowsDemo.js'

export default class ReactGraphComponent extends Component {
    constructor(props) {
      super(props)
      // instantiate a new GraphComponent
      this.graphComponent = new GraphComponent()
    }
  
    componentDidMount() {
      // append the GraphComponent to the DOM
      this.div.appendChild(this.graphComponent.div)
  
      NetworkFlowDemo(this.graphComponent, yFilesLicense)
    }
  
    render() {
      return (
            <div
            className="graph-component-container"
            ref={(node) => {
              this.div = node
            }}
            />
      )
    }
  }
  