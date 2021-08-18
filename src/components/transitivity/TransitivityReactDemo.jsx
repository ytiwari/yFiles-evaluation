import React, { Component } from 'react'
import { GraphComponent, GraphEditorInputMode, License, Point, Rect, ICommand,} from 'yfiles'
import yFilesLicense from '../../license.json'
import TransitivityDemo from './TransitivityDemo.js'
import DemoToolbar from '../DemoToolbar.jsx'

export default class ReactGraphComponent extends Component {
  constructor(props) {
    super(props)
    // instantiate a new GraphComponent
    this.graphComponent = new GraphComponent()
  }

  componentDidMount() {
    // append the GraphComponent to the DOM
    this.div.appendChild(this.graphComponent.div)

    TransitivityDemo(this.graphComponent, yFilesLicense)
  }

  render() {
    return (
        <div>
        <div className="toolbar">
            <DemoToolbar
              resetData={this.props.onResetData}
              zoomIn={() => ICommand.INCREASE_ZOOM.execute(null, this.graphComponent)}
              zoomOut={() => ICommand.DECREASE_ZOOM.execute(null, this.graphComponent)}
              resetZoom={() => ICommand.ZOOM.execute(1.0, this.graphComponent)}
              fitContent={() => ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent)}
            />
          </div>
          <div
          className="graph-component-container"
          ref={(node) => {
            this.div = node
          }}
          />
        </div>
    )
  }
}
