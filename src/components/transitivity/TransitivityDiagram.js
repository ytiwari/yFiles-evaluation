import React, { Component } from 'react'
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
    ViewportAnimation,
    GraphEditorInputMode
  } from 'yfiles'
import licenseData from '../../license'
import GraphData from './resources/yfiles-modules-data.js'
import PackageNodeStyleDecorator from './PackageNodeStyleDecorator.js'
import MagnifyNodeHighlightInstaller from './MagnifyNodeHighlightInstaller.js'

License.value = licenseData

export default class TransitivityDiagram extends Component {
  constructor(props) {
    super(props)

    // instantiate a new GraphComponent
    this.graphComponent = new GraphComponent()
    this.initializeInputModes()
    this.initializeStyles()
    this.initializeLayout()
    this.initializeGraph()
    
   let filteredGraph = new FilteredGraphWrapper(this.graphComponent, this.nodePredicate, this.edgePredicate)
    this.graphComponent = filteredGraph

    // configure an input mode for out of the box editing
    //this.graphComponent.inputMode = new GraphEditorInputMode()
  }

  componentDidMount() {
    // append the GraphComponent to the DOM
    this.div.appendChild(this.graphComponent.div)
   // graphComponent = new GraphComponent('graphComponent')

    // samplesComboBox = document.getElementById('samplesComboBox')
    // algorithmComboBox = document.getElementById('algorithmComboBox')
  
    // use a filtered graph to have control over which nodes and edges are visible at any time
 
    // load input module and initialize input
    
  
    this.loadGraph()
  
    //setLoadingIndicatorVisibility(false)
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

  async loadGraph() {
    filteredGraph.wrappedGraph.clear()
    filteredNodes = null
    filteredEdges = null
  
    addedEdges = []
  
    if (samplesComboBox.selectedIndex === SampleName.YFILES_MODULES_SAMPLE) {
      resetGraph()
  
      const builder = new GraphBuilder(graphComponent.graph)
      builder.createNodesSource({
        data: GraphData.nodes,
        id: 'id',
        labels: ['label']
      })
      builder.createEdgesSource(GraphData.edges, 'from', 'to')
  
      const graph = builder.buildGraph()
  
      graph.nodes.forEach(node => {
        const label = node.labels.first()
        const nodeLayout = new Rect(
          node.layout.x,
          node.layout.y,
          label.layout.width + 50,
          node.layout.height
        )
        graph.setNodeLayout(node, nodeLayout)
        graph.setLabelLayoutParameter(label, nodeLabelParameter)
        node.tag = { highlight: false }
      })
  
      startNode = getInitialPackage('yfiles')
      graphComponent.currentItem = startNode
  
      // initialize the values for yfiles/modules, so that we do not count them again
      dependentsNo = 0
      dependenciesNo = filteredGraph.nodes.size - 1
  
      applyAlgorithm()
      await applyLayout(false)
      graph.undoEngine.clear()
    } else {
      const packageText = packageTextBox.value
      // check for empty package name
      if (packageText.replace(/\s/g, '') === '') {
        packageTextBox.value = 'Invalid Package'
        packageTextBox.className = 'error'
      } else {
        // initialize dependents/dependencies values
        dependentsNo = 0
        dependenciesNo = 0
        filteredNodes = new Set()
        filteredEdges = new Set()
        visitedPackages = new HashMap()
        await updateGraph({ name: packageText, version: 'latest' }, false)
        getUndoEngine(graphComponent).clear()
      }
    }
  }

  setLoadingIndicatorVisibility(visible) {
    const loadingIndicator = document.getElementById('loadingIndicator')
    loadingIndicator.style.display = visible ? 'block' : 'none'
  }

  render() {
    return (
      <div className="graph-component-container" ref={(node) => {this.div = node}}/>
    )
  }
}
