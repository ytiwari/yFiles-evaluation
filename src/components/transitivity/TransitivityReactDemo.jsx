import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
    Animator,
    Arrow,
    ArrowType,
    BaseClass,
    Cursor,
    Cycle,
    DefaultLabelStyle,
    FilteredGraphWrapper,
    GraphBuilder,
    GraphComponent,
    GraphItemTypes,
    GraphViewerInputMode,
    HashMap,
    HierarchicLayout,
    HierarchicLayoutData,
    HierarchicLayoutEdgeRoutingStyle,
    HierarchicLayoutRoutingStyle,
    IArrow,
    ICommand,
    ICompoundEdit,
    IEdge,
    IEdgeStyle,
    IGraph,
    ILabelModelParameter,
    ILabelStyle,
    IMap,
    IMementoSupport,
    IModelItem,
    INode,
    INodeStyle,
    Insets,
    InteriorLabelModel,
    InteriorLabelModelPosition,
    LayoutExecutor,
    LayoutMode,
    LayoutOrientation,
    License,
    List,
    Matrix,
    PlaceNodesAtBarycenterStage,
    PlaceNodesAtBarycenterStageData,
    Point,
    PolylineEdgeStyle,
    PortAdjustmentPolicy,
    Rect,
    ShapeNodeStyle,
    SimplexNodePlacer,
    Size,
    TransitiveClosure,
    TransitiveReduction,
    UndoEngine,
    UndoUnitBase,
    ViewportAnimation
  } from 'yfiles'
// import './ReactGraphComponent.css'
import yFilesLicense from '../../license.json'
// eslint-disable-next-line import/no-webpack-loader-syntax
// import LayoutWorker from 'worker-loader!./LayoutWorker.js'

// const layoutWorker = new LayoutWorker()

export default class TransitivityReactDemo extends Component {
  constructor(props) {
    super(props)

    // include the yFiles License
    License.value = yFilesLicense

    // initialize the GraphComponent
    this.graphComponent = new GraphComponent()
    // register interaction
    this.graphComponent.inputMode = new GraphViewerInputMode()
    // register context menu on nodes and edges
    this.initializeContextMenu()
    // register tooltips
    this.initializeTooltips()
    // specify default styles for newly created nodes and edges
    this.initializeDefaultStyles()
  }

  async componentDidMount() {
    // Append the GraphComponent to the DOM
    this.div.appendChild(this.graphComponent.div)

    // // Build the graph from the given data...
    // this.updating = true
    // this.graphBuilder = this.createGraphBuilder()
    // this.graphComponent.graph = this.graphBuilder.buildGraph()
    // // ... and make sure it is centered in the view (this is the initial state of the layout animation)
    this.graphComponent.fitGraphBounds()

    // // Layout the graph with the hierarchic layout style
    // await this.graphComponent.morphLayout(new HierarchicLayout(), '1s')
    // this.updating = false

     // load input module and initialize input
  this.initializeInputModes()
  this.initializeStyles()
  this.initializeLayout()
  this.initializeGraph()

  this.loadGraph()
  }


initializeInputModes() {
    const mode = new GraphViewerInputMode({
      selectableItems: GraphItemTypes.NONE
    })
  
    // show enlarged nodes on hover
    mode.itemHoverInputMode.addHoveredItemChangedListener((sender, args) => {
      const item = args.item
      const oldItem = args.oldItem
  
      const highlightManager = graphComponent.highlightIndicatorManager
      if (item) {
        // add enlarged version of the node as highlight
        highlightManager.addHighlight(item)
        item.tag.highlight = true
      }
      if (oldItem) {
        // remove previous highlight
        highlightManager.removeHighlight(oldItem)
        oldItem.tag.highlight = false
      }
    })
    mode.itemHoverInputMode.hoverItems = GraphItemTypes.NODE
    mode.itemHoverInputMode.discardInvalidItems = false
    mode.itemHoverInputMode.hoverCursor = Cursor.POINTER
  
    // install custom highlight
    graphComponent.graph.decorator.nodeDecorator.highlightDecorator.setImplementation(
      new MagnifyNodeHighlightInstaller()
    )
  
    mode.addItemClickedListener(async (sender, args) => {
      // check if the clicked item is a node or if the loaded graph is yfiles/modules, since this graph has
      // no pending dependencies... in this case, we have to execute the code in addItemSelectedListener.
      if (args.item instanceof INode) {
        args.handled = true
  
        const item = args.item
        const gvim = graphComponent.inputMode
        const clickPoint = gvim.clickInputMode.clickLocation
  
        // if the node is hovered, we have to use the enlarged bounds of the highlight
        const nodeBounds = getEnlargedNodeBounds(item)
        const existingPackages = new HashMap()
  
        // check if dependencies' circle was hit
        if (
          item.tag &&
          item.tag.pendingDependencies &&
          clickIsInCircle(nodeBounds, clickPoint, nodeBounds.width)
        ) {
          handlePendingDependencies(item, existingPackages)
        } else if (item !== startNode) {
          const undoEdit = beginUndoEdit('undoChangeStartNode', 'redoChangeStartNode')
          getUndoEngine(graphComponent).addUnit(new ChangedSetUndoUnit())
          graphComponent.currentItem = item
          filteredGraph.nodes.forEach(node => {
            node.tag.pendingDependencies = false
          })
          await filterGraph(item)
          commitUndoEdit(undoEdit)
        }
      }
    })
  
    graphComponent.inputMode = mode
  }

initializeStyles() {
const shapeNodeStyle = new ShapeNodeStyle({
    shape: 'round-rectangle',
    stroke: 'rgb(102, 153, 204)',
    fill: 'rgb(102, 153, 204)'
})
defaultNodeStyle = new PackageNodeStyleDecorator(shapeNodeStyle)

normalEdgeStyle = new PolylineEdgeStyle({
    stroke: '2px black',
    targetArrow: IArrow.TRIANGLE,
    smoothingLength: 10
})

addedEdgeStyle = new PolylineEdgeStyle({
    stroke: '2px rgb(51, 102, 153)',
    targetArrow: new Arrow({
    fill: 'rgb(51, 102, 153)',
    stroke: 'rgb(51, 102, 153)',
    type: ArrowType.TRIANGLE
    }),
    smoothingLength: 10
})

removedEdgeStyle = new PolylineEdgeStyle({
    stroke: '2px dashed gray',
    targetArrow: new Arrow({
    fill: 'gray',
    stroke: 'gray',
    type: ArrowType.TRIANGLE
    }),
    smoothingLength: 10
})

nodeLabelStyle = new DefaultLabelStyle({
    font: 'Arial',
    textFill: 'white'
})

const nodeLabelModel = new InteriorLabelModel({
    insets: 9
})
nodeLabelParameter = nodeLabelModel.createParameter(InteriorLabelModelPosition.EAST)
}


initializeLayout() {
  layout = new HierarchicLayout()
  layout.layoutOrientation = LayoutOrientation.LEFT_TO_RIGHT
  layout.minimumLayerDistance = 0
  layout.nodeToNodeDistance = 20
  layout.backLoopRouting = true
  layout.automaticEdgeGrouping = true
  layout.nodePlacer.barycenterMode = true
  layout.edgeLayoutDescriptor.routingStyle = new HierarchicLayoutRoutingStyle(
    HierarchicLayoutEdgeRoutingStyle.OCTILINEAR
  )
}

initializeGraph() {
    const graph = filteredGraph
    graph.nodeDefaults.style = defaultNodeStyle
    graph.nodeDefaults.size = new Size(80, 30)
    graph.edgeDefaults.style = normalEdgeStyle
    graph.nodeDefaults.labels.style = nodeLabelStyle
    graph.undoEngineEnabled = true
}

  render() {
    return (
      <div>        
        <div
          className="graph-component-container"
          ref={node => {
            this.div = node
          }}
        />        
      </div>
    )
  }
}
