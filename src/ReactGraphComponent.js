import React, { Component } from 'react'
import {
  Arrow,
  ArrowType,
  DefaultLabelStyle,
  Fill,
  FreeNodePortLocationModel,
  GraphOverviewComponent,
  ICommand,
  License,
  PolylineEdgeStyle,
  Rect,
  ShapeNodeStyle,
  ShinyPlateNodeStyle,
  Size, 
  GraphComponent, 
  GraphEditorInputMode, 
  Point,
} from 'yfiles'
import licenseData from './license'

License.value = licenseData

export default class ReactGraphComponent extends Component {
  constructor(props) {
    super(props)

    // instantiate a new GraphComponent
    this.graphComponent = new GraphComponent()

    // configure an input mode for out of the box editing
    this.graphComponent.inputMode = new GraphEditorInputMode()
  }

  componentDidMount() {
    // append the GraphComponent to the DOM
    this.div.appendChild(this.graphComponent.div)

    // create some graph elements
    this.createSampleGraph(this.graphComponent.graph)

    // center the newly created graph
    this.graphComponent.fitGraphBounds()
  }

  createSampleGraph(graph) {
    // create some nodes
    const node1 = graph.createNodeAt(new Point(30, 30))
    const node2 = graph.createNodeAt(new Point(150, 30))
    const node3 = graph.createNode(new Rect(230, 200, 60, 30))

     // Creates some edges between the nodes
    const edge1 = graph.createEdge(node1, node2)
    const edge2 = graph.createEdge(node2, node3)

    // ///////////////////////////////////////////////////

    // ////////// Using Bends ////////////////////////////

    // Creates the first bend for edge2 at (260, 30)
    graph.addBend(edge2, new Point(260, 30))

      // ////////// Using Ports ////////////////////////////

  // Actually, edges connect "ports", not nodes directly.
  // If necessary, you can manually create ports at nodes
  // and let the edges connect to these.
  // Creates a port in the center of the node layout
  const port1AtNode1 = graph.addPort(node1, FreeNodePortLocationModel.NODE_CENTER_ANCHORED)

  // Creates a port at the middle of the left border
  // Note to use absolute locations when placing ports using PointD.
  const port1AtNode3 = graph.addPortAt(node3, new Point(node3.layout.x, node3.layout.center.y))

  // Creates an edge that connects these specific ports
  const edgeAtPorts = graph.createEdge(port1AtNode1, port1AtNode3)

  // ///////////////////////////////////////////////////

  // ////////// Sample label creation ///////////////////

  // Adds labels to several graph elements
  graph.addLabel(node1, 'n1')
  graph.addLabel(node2, 'n2')
  const n3Label = graph.addLabel(node3, 'n3')
  graph.addLabel(edgeAtPorts, 'Edge at Ports')
  }

  render() {
    return (
      <div className="graph-component-container" ref={(node) => {this.div = node}}/>
    )
  }
}
