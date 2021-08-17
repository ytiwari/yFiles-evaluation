/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2021 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import 'yfiles/yfiles.css'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import {
  GraphComponent,
  GraphEditorInputMode,
  GraphItemTypes,
  GraphMLSupport,
  ICommand,
  IEdge,
  IModelItem,
  INode,
  License,
  Point,
  StorageLocation,
  TimeSpan,
} from 'yfiles'
import licenseData from '../../license.json'
import loadGraph from '../../lib-csv/loadGraph'
import { eventBus } from '../../lib-csv/EventBus'
import { ExportFormat, ExportSupport } from '../../lib-csv/ExportSupport'
import Tooltip from './Tooltip'
import {
  VuejsNodeStyle,
  VuejsNodeStyleMarkupExtension,
} from '../../lib-csv/VuejsNodeStyle'
import PrintingSupport from '../../lib-csv/PrintingSupport'
import GraphSearch from '../../lib-csv/GraphSearch'
import ReactGraphOverviewComponent from './GraphOverviewComponent'
import { ContextMenu } from './ContextMenu'
import { detectiOSVersion, detectSafariVersion } from '../../lib-csv/Workarounds'

License.value = licenseData

export default class ReactGraphComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contextMenu: {
        show: false,
        x: 0,
        y: 0,
        items: [],
      },
    }
    this.div = React.createRef()

    // instantiate a new GraphComponent
    this.graphComponent = new GraphComponent()

    this.graphComponent.inputMode = new GraphEditorInputMode()

    this.initializeTooltips()
    this.graphSearch = new GraphSearch(this.graphComponent)
    this.graphComponent.graph.addNodeCreatedListener(
      this.updateSearch.bind(this)
    )
    this.graphComponent.graph.addNodeRemovedListener(
      this.updateSearch.bind(this)
    )
    this.graphComponent.graph.addLabelAddedListener(
      this.updateSearch.bind(this)
    )
    this.graphComponent.graph.addLabelRemovedListener(
      this.updateSearch.bind(this)
    )
    this.graphComponent.graph.addLabelTextChangedListener(
      this.updateSearch.bind(this)
    )

    this.registerToolbarEvents()
  }

  async componentDidMount() {
    // append the GraphComponent to the DOM
    this.graphComponent.div.style.width = '100%'
    this.graphComponent.div.style.height = '100%'
    this.div.current.appendChild(this.graphComponent.div)

    this.graphComponent.graph = await loadGraph()

    this.graphComponent.graph.undoEngineEnabled = true
    this.enableGraphML()
    this.initializeContextMenu()
    // center the newly created graph
    this.graphComponent.fitGraphBounds()
  }

  updateSearch() {
    this.graphSearch.updateSearch(this.$query)
  }

  registerToolbarEvents() {
    eventBus.subscribe('zoom-in', () => {
      ICommand.INCREASE_ZOOM.execute(null, this.graphComponent)
    })
    eventBus.subscribe('zoom-out', () => {
      ICommand.DECREASE_ZOOM.execute(null, this.graphComponent)
    })
    eventBus.subscribe('zoom-fit', () => {
      ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent)
    })
    eventBus.subscribe('clear', () => {
      this.graphComponent.graph.clear()
      ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent)
    })
    eventBus.subscribe('undo', () => {
      ICommand.UNDO.execute(null, this.graphComponent)
    })
    eventBus.subscribe('redo', () => {
      ICommand.REDO.execute(null, this.graphComponent)
    })
    eventBus.subscribe('export', (format) => {
      // export the graph of the current view
      const graph = this.graphComponent.graph

      if (graph.nodes.size === 0) {
        return
      }

      this.graphComponent.updateContentRect(30)
      const exportArea = this.graphComponent.contentRect
      switch (format) {
        case ExportFormat.SVG:
          ExportSupport.saveSvg(graph, exportArea, 1)
          break
        case ExportFormat.PNG:
          ExportSupport.savePng(graph, exportArea, 1)
          break
        case ExportFormat.PDF:
          ExportSupport.savePdf(graph, exportArea, 1)
          break
      }
    })
    eventBus.subscribe('open', () => {
      ICommand.OPEN.execute(null, this.graphComponent)
    })

    eventBus.subscribe('save', () => {
      ICommand.SAVE.execute(null, this.graphComponent)
    })
    eventBus.subscribe('print', () => {
      const printingSupport = new PrintingSupport()
      printingSupport.printGraph(this.graphComponent.graph)
    })
    eventBus.subscribe('search-query-input', (query) => {
      this.$query = query
      this.updateSearch()
    })
  }

  /**
   * Dynamic tooltips are implemented by adding a tooltip provider as an event handler for
   * the {@link MouseHoverInputMode#addQueryToolTipListener QueryToolTip} event of the
   * GraphEditorInputMode using the
   * {@link ToolTipQueryEventArgs} parameter.
   * The {@link ToolTipQueryEventArgs} parameter provides three relevant properties:
   * Handled, QueryLocation, and ToolTip. The Handled property is a flag which indicates
   * whether the tooltip was already set by one of possibly several tooltip providers. The
   * QueryLocation property contains the mouse position for the query in world coordinates.
   * The tooltip is set by setting the ToolTip property.
   */
  initializeTooltips() {
    const inputMode = this.graphComponent.inputMode

    // show tooltips only for nodes and edges
    inputMode.toolTipItems = GraphItemTypes.NODE | GraphItemTypes.EDGE

    // Customize the tooltip's behavior to our liking.
    const mouseHoverInputMode = inputMode.mouseHoverInputMode
    mouseHoverInputMode.toolTipLocationOffset = new Point(15, 15)
    mouseHoverInputMode.delay = TimeSpan.fromMilliseconds(500)
    mouseHoverInputMode.duration = TimeSpan.fromSeconds(5)

    // Register a listener for when a tooltip should be shown.
    inputMode.addQueryItemToolTipListener((src, eventArgs) => {
      if (eventArgs.handled) {
        // Tooltip content has already been assigned -> nothing to do.
        return
      }

      // Use a rich HTML element as tooltip content. Alternatively, a plain string would do as well.
      eventArgs.toolTip = this.createTooltipContent(eventArgs.item)

      // Indicate that the tooltip content has been set.
      eventArgs.handled = true
    })
  }

  /**
   * The tooltip may either be a plain string or it can also be a rich HTML element. In this case, we
   * show the latter by using a dynamically compiled Vue component.
   * @param {IModelItem} item
   * @returns {HTMLElement}
   */
  createTooltipContent(item) {
    let itemNr = -1
    if (INode.isInstance(item)) {
      itemNr = this.graphComponent.graph.nodes.indexOf(item) + 1
    } else if (IEdge.isInstance(item)) {
      // there should be only nodes and edges due to inputMode.tooltipItems
      itemNr = this.graphComponent.graph.edges.indexOf(item) + 1
    }

    const props = {
      title: INode.isInstance(item) ? 'Node Tooltip' : 'Edge Tooltip',
      content: INode.isInstance(item)
        ? `Node no. ${itemNr}`
        : `Edge no. ${itemNr}`,
    }
    const tooltipContainer = document.createElement('div')
    const element = React.createElement(Tooltip, props)
    ReactDOM.render(element, tooltipContainer)

    return tooltipContainer
  }

  updateContextMenuState(key, value) {
    const contextMenuState = { ...this.state.contextMenu }
    contextMenuState[key] = value
    this.setState({ contextMenu: contextMenuState })
  }

  initializeContextMenu() {
    const inputMode = this.graphComponent.inputMode
    this.addOpeningEventListeners(this.graphComponent, (location) => {
      const worldLocation = this.graphComponent.toWorldFromPage(location)
      const showMenu = inputMode.contextMenuInputMode.shouldOpenMenu(
        worldLocation
      )
      if (showMenu) {
        this.openMenu(location)
      }
    })

    inputMode.addPopulateItemContextMenuListener((sender, args) =>
      this.populateContextMenu(args)
    )
    inputMode.contextMenuInputMode.addCloseMenuListener(
      this.hideMenu.bind(this)
    )
  }

  hideMenu() {
    this.updateContextMenuState('show', false)
  }

  openMenu(location) {
    this.updateContextMenuState('x', location.x)
    this.updateContextMenuState('y', location.y - 48) // account for the header height
    this.updateContextMenuState('show', true)
  }

  populateContextMenu(args) {
    let menuItems = []
    const item = args.item
    if (INode.isInstance(item)) {
      menuItems.push({
        title: 'Node Context Menu Item',
        action: () => {
          alert('Clicked Node Context Menu Item')
        },
      })
    } else if (IEdge.isInstance(item)) {
      menuItems.push({
        title: 'Edge Context Menu Item',
        action: () => {
          alert('Clicked Edge Context Menu Item')
        },
      })
    }
    this.updateContextMenuState('items', menuItems)
    if (menuItems.length > 0) {
      args.showMenu = true
    }
  }

  getCenterInPage(element) {
    let left = element.clientWidth / 2.0
    let top = element.clientHeight / 2.0
    while (element.offsetParent) {
      left += element.offsetLeft
      top += element.offsetTop
      element = element.offsetParent
    }
    return { x: left, y: top }
  }

  addOpeningEventListeners(graphComponent, openingCallback) {
    const componentDiv = graphComponent.div
    const contextMenuListener = (evt) => {
      evt.preventDefault()
      if (this.state.contextMenu.show) {
        // might be open already because of the longpress listener
        return
      }
      const me = evt
      if (evt.mozInputSource === 1 && me.button === 0) {
        // This event was triggered by the context menu key in Firefox.
        // Thus, the coordinates of the event point to the lower left corner of the element and should be corrected.
        openingCallback(this.getCenterInPage(componentDiv))
      } else if (me.pageX === 0 && me.pageY === 0) {
        // Most likely, this event was triggered by the context menu key in IE.
        // Thus, the coordinates are meaningless and should be corrected.
        openingCallback(this.getCenterInPage(componentDiv))
      } else {
        openingCallback({ x: me.pageX, y: me.pageY })
      }
    }

    // Listen for the contextmenu event
    // Note: On Linux based systems (e.g. Ubuntu), the contextmenu event is fired on mouse down
    // which triggers the ContextMenuInputMode before the ClickInputMode. Therefore handling the
    // event, will prevent the ItemRightClicked event from firing.
    // For more information, see https://docs.yworks.com/yfileshtml/#/kb/article/780/
    componentDiv.addEventListener('contextmenu', contextMenuListener, false)

    if (detectSafariVersion() > 0 || detectiOSVersion() > 0) {
      // Additionally add a long press listener especially for iOS, since it does not fire the contextmenu event.
      let contextMenuTimer
      graphComponent.addTouchDownListener((sender, args) => {
        contextMenuTimer = setTimeout(() => {
          openingCallback(
            graphComponent.toPageFromView(
              graphComponent.toViewCoordinates(args.location)
            )
          )
        }, 500)
      })
      graphComponent.addTouchUpListener(() => {
        clearTimeout(contextMenuTimer)
      })
    }

    // Listen to the context menu key to make it work in Chrome
    componentDiv.addEventListener('keyup', (evt) => {
      if (evt.keyCode === 93) {
        evt.preventDefault()
        openingCallback(this.getCenterInPage(componentDiv))
      }
    })
  }

  /**
   * Enables loading and saving the graph to GraphML.
   */
  enableGraphML() {
    // Create a new GraphMLSupport instance that handles save and load operations.
    // This is a convenience layer around the core GraphMLIOHandler class
    // that does all the heavy lifting. It adds support for commands at the GraphComponent level
    // and file/loading and saving capabilities.
    const graphMLSupport = new GraphMLSupport({
      graphComponent: this.graphComponent,
      // configure to load and save to the file system
      storageLocation: StorageLocation.FILE_SYSTEM,
    })
    const graphmlHandler = graphMLSupport.graphMLIOHandler

    // needed when the VuejsNodeStyle was chosen in the NodeCreator of the GraphBuilder
    graphmlHandler.addXamlNamespaceMapping(
      'http://www.yworks.com/demos/yfiles-vuejs-node-style/1.0',
      'VuejsNodeStyle',
      VuejsNodeStyleMarkupExtension.$class
    )
    graphmlHandler.addNamespace(
      'http://www.yworks.com/demos/yfiles-vuejs-node-style/1.0',
      'VuejsNodeStyle'
    )

    graphmlHandler.addHandleSerializationListener((sender, args) => {
      const item = args.item
      const context = args.context
      if (item instanceof VuejsNodeStyle) {
        const vuejsNodeStyleMarkupExtension = new VuejsNodeStyleMarkupExtension()
        vuejsNodeStyleMarkupExtension.template = item.template
        context.serializeReplacement(
          VuejsNodeStyleMarkupExtension.$class,
          item,
          vuejsNodeStyleMarkupExtension
        )
        args.handled = true
      }
    })
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          className="graph-component-container"
          style={{ width: '100%', height: '100%' }}
          ref={this.div}
        />
        <ContextMenu
          x={this.state.contextMenu.x}
          y={this.state.contextMenu.y}
          show={this.state.contextMenu.show}
          items={this.state.contextMenu.items}
        />
        <div style={{ position: 'absolute', left: '20px', top: '20px' }}>
          <ReactGraphOverviewComponent graphComponent={this.graphComponent} />
        </div>
      </div>
    )
  }
}
