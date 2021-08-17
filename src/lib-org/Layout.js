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

import {
  CircularLayout,
  CircularLayoutStyle,
  DefaultNodePlacer,
  GenericLabeling,
  HierarchicLayout,
  HierarchicLayoutData,
  IGraph,
  ILayoutAlgorithm,
  INode,
  LayoutData,
  LayoutOrientation,
  MinimumNodeSizeStage,
  OrganicLayout,
  OrganicLayoutData,
  OrthogonalLayout,
  PartitionGridData,
  TreeLayout,
  TreeReductionStage,
} from 'yfiles'
import { BindingDescriptor, createBindingFunction } from './Bindings'

/**
 * @typedef {Object} LayoutConfiguration
 * @property {('hierarchic'|'organic'|'orthogonal'|'circular'|'tree')} layoutStyle
 * @property {('top-to-bottom'|'bottom-to-top'|'left-to-right'|'right-to-left')} layoutOrientation
 * @property {boolean} edgeLabeling
 * @property {number} edgeLength
 * @property {number} nodeDistance
 * @property {boolean} edgeGrouping
 * @property {number} compactness
 * @property {number} gridSpacing
 * @property {('bcc-compact'|'bcc-isolated'|'single-cycle')} circularLayoutStyle
 * @property {BindingDescriptor} gridColumns
 * @property {BindingDescriptor} gridRows
 */

/**
 * @param {!object} state
 * @param {!LayoutConfiguration} configuration
 * @returns {!object}
 */
export function arrange(state, configuration) {
  const graph = state.in
  if (graph) {
    const layoutData = getLayoutData(configuration)
    if (layoutData) {
      graph.applyLayout(
        new MinimumNodeSizeStage(getAlgorithm(configuration)),
        layoutData
      )
    } else {
      graph.applyLayout(new MinimumNodeSizeStage(getAlgorithm(configuration)))
    }
  }
  return { out: graph }
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getAlgorithm(configuration) {
  switch (configuration.layoutStyle) {
    case 'organic':
      return getOrganicLayout(configuration)
    case 'orthogonal':
      return getOrthogonalLayout(configuration)
    case 'circular':
      return getCircularLayout(configuration)
    case 'tree':
      return getTreeLayout(configuration)
    case 'hierarchic':
    default:
      return getHierarchicLayout(configuration)
  }
}

/**
 * @param {?function} bindingFunction
 * @returns {?function}
 */
function createNodeTagIndexFunction(bindingFunction) {
  if (bindingFunction) {
    return (node) => {
      const value = bindingFunction(node.tag)
      if (typeof value === 'undefined' || value === null) {
        return 0
      } else {
        return Number(value) | 0
      }
    }
  } else {
    return null
  }
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {?PartitionGridData}
 */
function createPartitionGridData(configuration) {
  const columnFunction = createNodeTagIndexFunction(
    createBindingFunction(configuration.gridColumns)
  )
  const rowFunction = createNodeTagIndexFunction(
    createBindingFunction(configuration.gridRows)
  )
  if (columnFunction || rowFunction) {
    const gridData = new PartitionGridData()
    if (rowFunction) {
      gridData.rowIndices.delegate = rowFunction
    }
    if (columnFunction) {
      gridData.columnIndices.delegate = columnFunction
    }
    return gridData
  }
  return null
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {?LayoutData}
 */
function getLayoutData(configuration) {
  switch (configuration.layoutStyle) {
    case 'organic': {
      const partitionGridData = createPartitionGridData(configuration)
      if (partitionGridData !== null) {
        return new OrganicLayoutData({ partitionGridData })
      }
      break
    }
    case 'hierarchic': {
      const partitionGridData = createPartitionGridData(configuration)
      if (partitionGridData !== null) {
        return new HierarchicLayoutData({ partitionGridData })
      }
      break
    }
  }
  return null
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getHierarchicLayout(configuration) {
  const layout = new HierarchicLayout()
  layout.layoutOrientation = getLayoutOrientation(configuration)
  layout.integratedEdgeLabeling = configuration.edgeLabeling
  layout.nodeToNodeDistance = configuration.nodeDistance
  layout.automaticEdgeGrouping = configuration.edgeGrouping
  layout.orthogonalRouting = true
  return layout
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getOrganicLayout(configuration) {
  const layout = new OrganicLayout()
  layout.preferredEdgeLength = configuration.edgeLength
  layout.minimumNodeDistance = configuration.nodeDistance
  layout.compactnessFactor = configuration.compactness
  layout.labeling.placeEdgeLabels = true
  layout.labeling.placeNodeLabels = false
  layout.labelingEnabled = configuration.edgeLabeling
  return layout
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getOrthogonalLayout(configuration) {
  const layout = new OrthogonalLayout()
  layout.gridSpacing = configuration.gridSpacing
  layout.integratedEdgeLabeling = configuration.edgeLabeling
  return layout
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getCircularLayout(configuration) {
  const layout = new CircularLayout()
  layout.layoutStyle = getCircularLayoutStyle(configuration)
  layout.labeling.placeEdgeLabels = true
  layout.labeling.placeNodeLabels = false
  layout.labelingEnabled = configuration.edgeLabeling
  return layout
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!ILayoutAlgorithm}
 */
function getTreeLayout(configuration) {
  const layout = new TreeLayout()
  layout.layoutOrientation = getLayoutOrientation(configuration)
  layout.integratedEdgeLabeling = configuration.edgeLabeling
  const nodePlacer = layout.defaultNodePlacer
  nodePlacer.horizontalDistance = configuration.nodeDistance
  nodePlacer.verticalDistance = configuration.nodeDistance
  return new TreeReductionStage(layout)
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!LayoutOrientation}
 */
function getLayoutOrientation(configuration) {
  switch (configuration.layoutOrientation) {
    case 'bottom-to-top':
      return LayoutOrientation.BOTTOM_TO_TOP
    case 'left-to-right':
      return LayoutOrientation.LEFT_TO_RIGHT
    case 'right-to-left':
      return LayoutOrientation.RIGHT_TO_LEFT
    case 'top-to-bottom':
    default:
      return LayoutOrientation.TOP_TO_BOTTOM
  }
}

/**
 * @param {!LayoutConfiguration} configuration
 * @returns {!CircularLayoutStyle}
 */
function getCircularLayoutStyle(configuration) {
  switch (configuration.circularLayoutStyle) {
    case 'bcc-isolated':
      return CircularLayoutStyle.BCC_ISOLATED
    case 'single-cycle':
      return CircularLayoutStyle.SINGLE_CYCLE
    case 'bcc-compact':
    default:
      return CircularLayoutStyle.BCC_COMPACT
  }
}
