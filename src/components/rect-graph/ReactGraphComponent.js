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
import licenseData from '../../license'

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
    this.setDefaultStyles(this.graphComponent.graph);
    // create some graph elements
    this.createSampleGraph(this.graphComponent.graph)
    this.updateViewport(this.graphComponent)
    // center the newly created graph
    // this.graphComponent.fitGraphBounds()
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

    // Sets the source and target arrows on the edge style instance
  // Note that IEdgeStyle itself does not have these properties
  const sourceArrowStyle = new Arrow({
    type: ArrowType.CIRCLE,
    stroke: 'blue',
    fill: Fill.RED,
    cropLength: 3
  })

  const targetArrowStyle = new Arrow({
    type: ArrowType.SHORT,
    stroke: 'blue',
    fill: Fill.BLUE,
    cropLength: 1
  })

  const edgeStyle = new PolylineEdgeStyle({
    stroke: '2px dashed red',
    sourceArrow: sourceArrowStyle,
    targetArrow: targetArrowStyle
  })

  // Assign the defined edge style as the default for all edges that don't have
  // another style assigned explicitly
  graph.setStyle(edge1, edgeStyle)

  // Creates a different style for the label with black text and a red border
  const sls = new DefaultLabelStyle({
    backgroundStroke: 'red',
    backgroundFill: 'white',
    insets: [3, 5, 3, 5]
  })

  // And sets the style for the label, again through its owning graph.
  graph.setStyle(n3Label, sls)
  // Custom node style
  const nodeStyle2 = new ShapeNodeStyle({
    shape: 'ellipse',
    fill: 'orange',
    stroke: 'red'
  })
  graph.setStyle(node2, nodeStyle2)
  const nodeStyle3 = new ShinyPlateNodeStyle({
    fill: 'orange',
    stroke: 'white'
  })
  graph.setStyle(node3, nodeStyle3)
  }

  setDefaultStyles(graph) {
   // const graph = graphComponent.graph
  
    // Creates a nice ShinyPlateNodeStyle instance, using an orange Fill.
    // Sets this style as the default for all nodes that don't have another
    // style assigned explicitly
    graph.nodeDefaults.style = new ShapeNodeStyle({
      fill: 'darkorange',
      stroke: 'white'
    })
  
    // Sets the default size for nodes explicitly to 40x40
    graph.nodeDefaults.size = new Size(40, 40)
  
    // Creates a label style with the label font set to Tahoma and a black text color
    const defaultLabelStyle = new DefaultLabelStyle({
      font: '12px Tahoma',
      textFill: 'black'
    })
  
    // Sets the defined style as the default for both edge and node labels
    graph.edgeDefaults.labels.style = defaultLabelStyle
    graph.nodeDefaults.labels.style = defaultLabelStyle
  }

  updateViewport(graph) {
    // Uncomment the following line to update the content rectangle
    // to include all graph elements
    // This should result in correct scrolling behaviour:
  
        graph.updateContentRect();
  
    // Additionally, we can also set the zoom level so that the
    // content rectangle fits exactly into the viewport area:
    // Uncomment this line in addition to UpdateContentRect:
    // Note that this changes the zoom level (i.e. the graph elements will look smaller)

      graph.fitContent();
  
    // The sequence above is equivalent to just calling:
      graph.fitGraphBounds()
  }

  render() {
    return (
      <div className="graph-component-container" ref={(node) => {this.div = node}}/>
    )
  }
}
