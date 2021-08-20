import React, { Component } from 'react'
import { GraphComponent, GraphEditorInputMode, License, Point, Rect, ICommand,} from 'yfiles'
import yFilesLicense from '../../license.json'
import {run, onAlgorithmChanged}  from './NetworkFlowsDemo.js'
import UIComponent from './UIComponent';
import DemoToolbar from './DemoToolbar.jsx'

export default class ReactGraphComponent extends Component {
    constructor(props) {
      super(props)
      // instantiate a new GraphComponent
      this.graphComponent = new GraphComponent()
    }
  
    componentDidMount() {
      // append the GraphComponent to the DOM
      this.div.appendChild(this.graphComponent.div)
  
      run(this.graphComponent, yFilesLicense)
    }


  
    render() {
      return (
        <> 
        <div className="toolbar">
        <DemoToolbar
          resetData={this.props.onResetData}
          zoomIn={() => ICommand.INCREASE_ZOOM.execute(null, this.graphComponent)}
          zoomOut={() => ICommand.DECREASE_ZOOM.execute(null, this.graphComponent)}
          resetZoom={() => ICommand.ZOOM.execute(1.0, this.graphComponent)}
          undo={() => ICommand.UNDO.execute(null, this.graphComponent)}
          redo={() => ICommand.REDO.execute(null, this.graphComponent)}
          algoChange = {() => onAlgorithmChanged()}
          fitContent={() => ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent)}
          searchChange={evt => this.onSearchQueryChanged(evt.target.value)}
        />
      </div>      
          <UIComponent/>
          <div className="graph-component-container" ref={(node) => {this.div = node}}/>
        </>
      )
    }
  }
  