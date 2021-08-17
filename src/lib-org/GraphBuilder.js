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
  Arrow,
  ArrowType,
  DefaultLabelStyle,
  EdgeCreator,
  EdgePathLabelModel,
  GraphBuilder,
  HashMap,
  IGraph,
  ILabelModelParameter,
  ImageNodeStyle,
  IMap,
  InteriorLabelModel,
  LabelCreator,
  MapEntry,
  NinePositionsEdgeLabelModel,
  NodeCreator,
  ObjectBindings,
  PolylineEdgeStyle,
  ShapeNodeShape,
  ShapeNodeStyle,
  ShapeNodeStyleRenderer,
  Size,
  StringTemplateNodeStyle,
} from 'yfiles'
import { VuejsNodeStyle } from './VuejsNodeStyle'
import {
  BindingDescriptor,
  createBindingFunction,
  evalBinding,
} from './Bindings'

/**
 * @typedef {Object} LabelConfiguration
 * @property {BindingDescriptor} labelsBinding
 * @property {BindingDescriptor} textBinding
 * @property {BindingDescriptor} placement
 * @property {BindingDescriptor} fill
 */

/**
 * @typedef {(function|IdProviderConvertible.<T>)} IdProvider
 */

/**
 * @typedef {Object} EdgesSourceData
 * @property {Array.<T>} data
 * @property {IdProvider.<T>} idProvider
 * @property {IdProvider.<T>} sourceIdProvider
 * @property {IdProvider.<T>} targetIdProvider
 * @property {EdgeCreator} [edgeCreator]
 */

/**
 * @typedef {Object} NodesSourceData
 * @property {Array.<T>} data
 * @property {IdProvider.<T>} idProvider
 * @property {IdProvider.<T>} parentIdProvider
 * @property {NodeCreator} [nodeCreator]
 */

/**
 * @typedef {Object} LabelConfigurationData
 * @property {BindingDescriptor} labelsBinding
 * @property {BindingDescriptor} textBinding
 * @property {BindingDescriptor} placement
 * @property {BindingDescriptor} fill
 */

/**
 * @typedef {Object} NodeCreatorConfiguration
 * @property {string} [template]
 * @property {BindingDescriptor} tagProvider
 * @property {BindingDescriptor} isGroupProvider
 * @property {string} styleBindings
 * @property {BindingDescriptor} layout
 * @property {BindingDescriptor} x
 * @property {BindingDescriptor} y
 * @property {BindingDescriptor} width
 * @property {BindingDescriptor} height
 * @property {NodeStyle} styleProvider
 * @property {BindingDescriptor} fill
 * @property {BindingDescriptor} shape
 * @property {BindingDescriptor} stroke
 * @property {BindingDescriptor} image
 */

/**
 * @typedef {('ShapeNodeStyle'|'ImageNodeStyle'|'TemplateNodeStyle'|'VueJSNodeStyle')} NodeStyle
 */

export const shapesMap = new HashMap({
  entries: [
    new MapEntry('Diamond', ShapeNodeShape.DIAMOND),
    new MapEntry('Ellipse', ShapeNodeShape.ELLIPSE),
    new MapEntry('Hexagon', ShapeNodeShape.HEXAGON),
    new MapEntry('Octagon', ShapeNodeShape.OCTAGON),
    new MapEntry('Rectangle', ShapeNodeShape.RECTANGLE),
    new MapEntry('Round Rectangle', ShapeNodeShape.ROUND_RECTANGLE),
    new MapEntry('Sheared Rectangle', ShapeNodeShape.SHEARED_RECTANGLE),
    new MapEntry('Sheared Rectangle 2', ShapeNodeShape.SHEARED_RECTANGLE2),
    new MapEntry('Trapezoid', ShapeNodeShape.TRAPEZ),
    new MapEntry('Trapezoid 2', ShapeNodeShape.TRAPEZ2),
    new MapEntry('Triangle', ShapeNodeShape.TRIANGLE),
    new MapEntry('Triangle 2', ShapeNodeShape.TRIANGLE2),
  ],
})

export const arrowsMap = new HashMap({
  entries: [
    new MapEntry('Circle', ArrowType.CIRCLE),
    new MapEntry('Cross', ArrowType.CROSS),
    new MapEntry('Default', ArrowType.DEFAULT),
    new MapEntry('Diamond', ArrowType.DIAMOND),
    new MapEntry('None', ArrowType.NONE),
    new MapEntry('Short', ArrowType.SHORT),
    new MapEntry('Simple', ArrowType.SIMPLE),
    new MapEntry('Triangle', ArrowType.TRIANGLE),
  ],
})

export /**
 * @readonly
 * @enum {number}
 */
const LabelPlacement = {
  TopLeft: 'topleft',
  Top: 'top',
  TopRight: 'topright',
  Left: 'left',
  Center: 'center',
  Right: 'right',
  Bottom: 'bottom',
  BottomLeft: 'bottomleft',
  BottomRight: 'bottomright',
  SourceAbove: 'sourceabove',
  CenteredAbove: 'centeredabove',
  TargetAbove: 'targetabove',
  SourceCentered: 'sourcecentered',
  CenterCentered: 'centercentered',
  TargetCentered: 'targetcentered',
  SourceBelow: 'sourcebelow',
  CenteredBelow: 'centeredbelow',
  TargetBelow: 'targetbelow',
}

/**
 * @param {!object} state
 * @param {!object} configuration
 * @returns {!object}
 */
export function buildEdgesSourceData(state, configuration) {
  return {
    edgesSource: {
      data: state.data,
      idProvider: createBindingFunction(configuration.idProvider),
      sourceIdProvider: createBindingFunction(configuration.sourceIdProvider),
      targetIdProvider: createBindingFunction(configuration.targetIdProvider),
      edgeCreator: state.edgeCreator,
    },
  }
}

/**
 * @param {!object} state
 * @param {!object} configuration
 * @returns {!object}
 */
export function buildNodesSourceData(state, configuration) {
  return {
    nodesSource: {
      data: state.data,
      idProvider: createBindingFunction(configuration.idProvider),
      parentIdProvider: createBindingFunction(configuration.parentIdProvider),
      nodeCreator: state.nodeCreator,
    },
  }
}

/**
 * @param {!string} placement
 */
function asLayoutParameterForNodes(placement) {
  if (!placement) {
    return InteriorLabelModel.CENTER
  }
  placement.replace('_', '')
  switch (placement.toLowerCase()) {
    case LabelPlacement.TopLeft:
      return InteriorLabelModel.NORTH_WEST
    case LabelPlacement.Top:
      return InteriorLabelModel.NORTH
    case LabelPlacement.TopRight:
      return InteriorLabelModel.NORTH_EAST
    case LabelPlacement.Left:
      return InteriorLabelModel.WEST
    case LabelPlacement.Center:
      return InteriorLabelModel.CENTER
    case LabelPlacement.Right:
      return InteriorLabelModel.EAST
    case LabelPlacement.BottomLeft:
      return InteriorLabelModel.SOUTH_WEST
    case LabelPlacement.Bottom:
      return InteriorLabelModel.SOUTH
    case LabelPlacement.BottomRight:
      return InteriorLabelModel.SOUTH_EAST
    default:
      return InteriorLabelModel.CENTER
  }
}

/**
 * @param {!string} placement
 */
function asLayoutParameterForEdges(placement) {
  if (!placement) {
    return NinePositionsEdgeLabelModel.CENTER_BELOW
  }
  placement.replace('_', '')
  switch (placement.toLowerCase()) {
    case LabelPlacement.TopLeft:
    case LabelPlacement.SourceAbove:
      return NinePositionsEdgeLabelModel.SOURCE_ABOVE
    case LabelPlacement.CenteredAbove:
    case LabelPlacement.Top:
      return NinePositionsEdgeLabelModel.CENTER_ABOVE
    case LabelPlacement.TargetAbove:
    case LabelPlacement.TopRight:
      return NinePositionsEdgeLabelModel.TARGET_ABOVE
    case LabelPlacement.SourceCentered:
    case LabelPlacement.Left:
      return NinePositionsEdgeLabelModel.SOURCE_CENTERED
    case LabelPlacement.CenterCentered:
    case LabelPlacement.Center:
      return NinePositionsEdgeLabelModel.CENTER_CENTERED
    case LabelPlacement.TargetCentered:
    case LabelPlacement.Right:
      return NinePositionsEdgeLabelModel.TARGET_CENTERED
    case LabelPlacement.SourceBelow:
    case LabelPlacement.BottomLeft:
      return NinePositionsEdgeLabelModel.SOURCE_BELOW
    case LabelPlacement.CenteredBelow:
    case LabelPlacement.Bottom:
      return NinePositionsEdgeLabelModel.CENTER_BELOW
    case LabelPlacement.TargetBelow:
    case LabelPlacement.BottomRight:
      return NinePositionsEdgeLabelModel.TARGET_BELOW
    default:
      return NinePositionsEdgeLabelModel.CENTER_BELOW
  }
}

/**
 * @param {!LabelConfiguration} labelConfiguration
 * @param {boolean} nodes
 * @returns {!LabelCreator.<T>}
 */
export function createLabelCreator(labelConfiguration, nodes) {
  const creator = new LabelCreator()
  configureLabelCreator(
    labelConfiguration,
    creator,
    nodes ? asLayoutParameterForNodes : asLayoutParameterForEdges
  )
  return creator
}

/**
 * @param {!LabelConfigurationData} labelConfiguration
 * @param {!LabelCreator.<T>} labelCreator
 * @param {!function} layoutParameterProvider
 */
function configureLabelCreator(
  labelConfiguration,
  labelCreator,
  layoutParameterProvider
) {
  labelCreator.defaults.style = new DefaultLabelStyle()
  labelCreator.defaults.shareStyleInstance = false

  const placementBinding = createBindingFunction(labelConfiguration.placement)
  if (placementBinding) {
    labelCreator.layoutParameterProvider = (item) => {
      return layoutParameterProvider(placementBinding(item))
    }
  }

  maybeAddBinding(
    labelCreator.styleBindings,
    'textFill',
    labelConfiguration.fill
  )
}

/**
 * @param {!ObjectBindings.<unknown>} bindings
 * @param {!string} [propertyName=fill]
 * @param {!BindingDescriptor} binding
 * @returns {?function}
 */
function maybeAddBinding(bindings, propertyName = 'fill', binding) {
  const provider = createBindingFunction(binding)
  if (provider) {
    bindings.addBinding(propertyName, provider)
    return provider
  }
  return null
}

/**
 * @param {!object} state
 * @param {!NodeCreatorConfiguration} configuration
 * @returns {!object}
 */
export function buildNodeCreator(state, configuration) {
  const nodeCreator = newConfiguredNodeCreator()

  const defaults = nodeCreator.defaults

  if (configuration.styleProvider === 'ImageNodeStyle') {
    nodeCreator.styleProvider = (item) => {
      return new ImageNodeStyle({
        image: evalBinding(configuration.image, item),
      })
    }
  } else if (configuration.styleProvider === 'ShapeNodeStyle') {
    maybeAddBinding(nodeCreator.styleBindings, 'fill', configuration.fill)
    maybeAddBinding(nodeCreator.styleBindings, 'stroke', configuration.stroke)

    const shapeBinding = createBindingFunction(configuration.shape)
    if (shapeBinding) {
      nodeCreator.styleProvider = (item) => {
        let shape = ShapeNodeShape.RECTANGLE
        const result = shapeBinding(item)
        if (result) {
          shape = shapesMap.get(result) || ShapeNodeShape.RECTANGLE
        }

        return new ShapeNodeStyle({
          shape: shape,
        })
      }
    }
  } else if (configuration.styleProvider === 'VueJSNodeStyle') {
    const vuejsNodeStyle = new VuejsNodeStyle(configuration.template || '<g/>')
    nodeCreator.styleProvider = () => vuejsNodeStyle
  } else if (configuration.styleProvider === 'TemplateNodeStyle') {
    const stringTemplateNodeStyle = new StringTemplateNodeStyle({
      svgContent: configuration.template || '<g/>',
    })
    nodeCreator.styleProvider = () => stringTemplateNodeStyle
  }

  nodeCreator.layoutProvider = createBindingFunction(configuration.layout)
  maybeAddBinding(nodeCreator.layoutBindings, 'x', configuration.x)
  maybeAddBinding(nodeCreator.layoutBindings, 'y', configuration.y)
  maybeAddBinding(nodeCreator.layoutBindings, 'width', configuration.width)
  maybeAddBinding(nodeCreator.layoutBindings, 'height', configuration.height)

  const tagProvider = createBindingFunction(configuration.tagProvider)
  if (tagProvider) {
    nodeCreator.tagProvider = tagProvider
  }

  const isGroupProvider = createBindingFunction(configuration.isGroupProvider)
  if (isGroupProvider) {
    nodeCreator.isGroupPredicate = (dataItem) => !!isGroupProvider(dataItem)
  }

  if (state.labelConfigurations) {
    applyLabelConfiguration(state.labelConfigurations, nodeCreator, true)
  }

  return { nodeCreator: nodeCreator }
}

/**
 * @param {!Array.<LabelConfigurationData>} labelConfigurations
 * @param {!(EdgeCreator.<unknown>|NodeCreator.<unknown>)} creator
 * @param {boolean} nodes
 */
function applyLabelConfiguration(labelConfigurations, creator, nodes) {
  for (const labelConfiguration of labelConfigurations) {
    let labelCreator
    const bindingFunction = createBindingFunction(
      labelConfiguration.labelsBinding
    )
    const textBinding = createBindingFunction(labelConfiguration.textBinding)
    if (textBinding) {
      if (bindingFunction) {
        labelCreator = creator.createLabelsSource({
          data: bindingFunction,
          text: textBinding,
        }).labelCreator
      } else {
        labelCreator = creator.createLabelBinding(textBinding)
      }
      configureLabelCreator(
        labelConfiguration,
        labelCreator,
        nodes ? asLayoutParameterForNodes : asLayoutParameterForEdges
      )
    }
  }
}

/**
 * @param {?function} arrowBinding
 * @param {*} item
 * @returns {!ArrowType}
 */
function getArrow(arrowBinding, item) {
  if (!arrowBinding || !arrowBinding(item)) {
    return ArrowType.NONE
  }
  const arrowType = arrowsMap.get(arrowBinding(item))
  return arrowType || ArrowType.NONE
}

/**
 * @param {?function} binding
 * @param {*} item
 * @returns {!string}
 */
function getColor(binding, item) {
  return binding && binding(item) ? binding(item) : '#000'
}

/**
 * @param {?function} arrowBinding
 * @param {?function} strokeBinding
 * @param {*} item
 * @returns {!Arrow}
 */
function createArrow(arrowBinding, strokeBinding, item) {
  return new Arrow({
    type: getArrow(arrowBinding, item),
    fill: getColor(strokeBinding, item),
    stroke: getColor(strokeBinding, item),
  })
}

/**
 * @param {!object} state
 * @param {!object} configuration
 * @returns {!object}
 */
export function buildEdgeCreator(state, configuration) {
  const edgeCreator = newConfiguredEdgeCreator()

  const edgeDefaults = edgeCreator.defaults
  edgeDefaults.shareStyleInstance = false

  const tagProvider = createBindingFunction(configuration.tagProvider)
  if (tagProvider) {
    edgeCreator.tagProvider = tagProvider
  }

  const strokeBinding = maybeAddBinding(
    edgeCreator.styleBindings,
    'stroke',
    configuration.stroke
  )

  const sourceBinding = createBindingFunction(configuration.sourceArrow)
  const targetBinding = createBindingFunction(configuration.targetArrow)
  if (sourceBinding && targetBinding) {
    edgeCreator.styleProvider = (item) => {
      return new PolylineEdgeStyle({
        stroke: getColor(strokeBinding, item),
        sourceArrow: createArrow(sourceBinding, strokeBinding, item),
        targetArrow: createArrow(targetBinding, strokeBinding, item),
      })
    }
  }

  if (state.labelConfigurations) {
    applyLabelConfiguration(state.labelConfigurations, edgeCreator, false)
  }

  return { edgeCreator: edgeCreator }
}

/**
 * @param {!object} state
 * @param {!object} configuration
 * @returns {!object}
 */
export function buildLabelConfiguration(state, configuration) {
  return {
    labelConfiguration: {
      labelsBinding: configuration.labelsBinding,
      textBinding: configuration.textBinding,
      placement: configuration.placement,
      fill: configuration.fill,
    },
  }
}

/**
 * @param {!object} state
 * @param {!object} configuration
 * @returns {!object}
 */
export function buildGraph(state, configuration) {
  const builder = new GraphBuilder()

  for (const src of state.nodesSources || []) {
    if (!src.data) {
      continue
    }

    const nodesSource = builder.createNodesSource({
      data: src.data,
      id: src.idProvider,
      parentId: src.parentIdProvider,
    })
    nodesSource.nodeCreator = src.nodeCreator
      ? src.nodeCreator
      : newConfiguredNodeCreator()

    const creator = nodesSource.nodeCreator
  }

  for (const src of state.edgesSources || []) {
    if (!src.data) {
      continue
    }

    const edgesSource = builder.createEdgesSource(
      src.data,
      src.sourceIdProvider,
      src.targetIdProvider,
      src.idProvider
    )
    if (src.edgeCreator) {
      edgesSource.edgeCreator = src.edgeCreator
    } else {
      edgesSource.edgeCreator = newConfiguredEdgeCreator()
    }

    const creator = edgesSource.edgeCreator
  }

  builder.updateGraph()
  return { graph: builder.graph }
}

/**
 * @returns {!NodeCreator.<unknown>}
 */
function newConfiguredNodeCreator() {
  const nodeCreator = new NodeCreator()
  const nodeDefaults = nodeCreator.defaults
  nodeDefaults.style = new ShapeNodeStyle({
    shape: 'round-rectangle',
    fill: '#eee',
    stroke: '#323232',
  })
  nodeDefaults.style.renderer.roundRectArcRadius = 3
  nodeDefaults.shareStyleInstance = false
  nodeDefaults.size = new Size(60, 30)

  const labelDefaults = nodeDefaults.labels
  labelDefaults.style = new DefaultLabelStyle({
    textSize: 14,
    textFill: 'black',
  })
  labelDefaults.shareStyleInstance = true
  labelDefaults.layoutParameter = InteriorLabelModel.SOUTH
  return nodeCreator
}

/**
 * @returns {!EdgeCreator.<unknown>}
 */
function newConfiguredEdgeCreator() {
  const edgeCreator = new EdgeCreator()
  const edgeDefaults = edgeCreator.defaults
  edgeDefaults.style = new PolylineEdgeStyle({
    stroke: '#eee',
    smoothingLength: 5,
    targetArrow: '#eee medium triangle',
  })
  edgeDefaults.shareStyleInstance = false

  const labelDefaults = edgeDefaults.labels
  labelDefaults.style = new DefaultLabelStyle({
    textSize: 12,
    textFill: '#eee',
  })
  labelDefaults.shareStyleInstance = true
  labelDefaults.layoutParameter = new EdgePathLabelModel({
    autoRotation: false,
  }).createRatioParameter()
  return edgeCreator
}
