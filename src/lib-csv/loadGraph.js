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

import { text } from './Text'
import { parseCsv } from './CSVParser'
import {
  buildEdgeCreator,
  buildEdgesSourceData,
  buildGraph,
  buildLabelConfiguration,
  buildNodeCreator,
  buildNodesSourceData,
} from './GraphBuilder'

/**
 * This is automatically generated source code. It is largely undocumented and not necessarily
 * instructive, nor the best way to solve a given task. If you want to learn more about the
 * yFiles API, as a starting point, please consider the more instructive source code tutorial and
 * more than 200 examples on https://live.yworks.com - you will also find the complete sources to
 * these demos for you to play with as part of the evaluation package and online at
 * https://github.com/yWorks/yfiles-for-html-demos/
 * The API documentation is also available online, here: https://docs.yworks.com/yfileshtml - Enjoy!
 */
export default async function loadGraph() {
  const { value } = await text(
    {},
    {
      value:
        'id,s,t,label,color\n1,1,2,Link to 2,"rgb(232,203,135)"\n2,1,3,Link to 3,"rgb(133,161,194)"\n3,2,3,Link to 3,"rgb(133,161,194)"',
    }
  )
  const { data } = await parseCsv(
    { text: value },
    {
      columns: true,
      escape: '"',
      trim: false,
      record_delimiter: undefined,
      delimiter: [',', ';'],
    }
  )
  const { value: value2 } = await text(
    {},
    {
      value:
        'id,color,label,x,y,width,height\n1,"rgb(185,96,105)",Item 1,100,100,110,80\n2,"rgb(232,203,135)",Item 2,300,200,110,80\n3,"rgb(133,161,194)",Item 3,100,300,110,80',
    }
  )
  const { data: data2 } = await parseCsv(
    { text: value2 },
    {
      columns: true,
      escape: '"',
      trim: false,
      record_delimiter: undefined,
      delimiter: [',', ';'],
    }
  )
  const { labelConfiguration } = await buildLabelConfiguration(
    {},
    {
      labelsBinding: { type: 'expression', value: '' },
      textBinding: { type: 'expression', value: 'label' },
      placement: { type: 'constant', value: 'top' },
      fill: { type: 'constant', value: '#aaa' },
    }
  )
  const {
    labelConfiguration: labelConfiguration2,
  } = await buildLabelConfiguration(
    {},
    {
      labelsBinding: { type: 'expression', value: '' },
      textBinding: { type: 'expression', value: 'color' },
      placement: { type: 'constant', value: 'bottom' },
      fill: { type: 'constant', value: '#777' },
    }
  )
  const { nodeCreator } = await buildNodeCreator(
    { labelConfigurations: [labelConfiguration2, labelConfiguration] },
    {
      tagProvider: { type: 'expression', value: '' },
      isGroupProvider: { type: 'expression', value: '' },
      styleBindings: '',
      layout: { type: 'expression', value: '' },
      x: { type: 'expression', value: 'x' },
      y: { type: 'expression', value: 'y' },
      width: { type: 'expression', value: 'width' },
      height: { type: 'expression', value: 'height' },
      styleProvider: 'ShapeNodeStyle',
      fill: { type: 'constant', value: '#222' },
      shape: { type: 'constant', value: 'Round Rectangle' },
      stroke: { type: 'expression', value: 'color' },
      image: { type: 'constant', value: '' },
    }
  )
  const { nodesSource } = await buildNodesSourceData(
    { data: data2, nodeCreator },
    {
      idProvider: { type: 'expression', value: 'id' },
      parentIdProvider: { type: 'expression', value: '' },
    }
  )
  const {
    labelConfiguration: labelConfiguration3,
  } = await buildLabelConfiguration(
    {},
    {
      labelsBinding: { type: 'expression', value: '' },
      textBinding: { type: 'expression', value: 'label' },
      placement: { type: 'constant', value: 'center' },
      fill: { type: 'constant', value: '#eee' },
    }
  )
  const { edgeCreator } = await buildEdgeCreator(
    { labelConfigurations: [labelConfiguration3] },
    {
      tagProvider: { type: 'expression', value: '' },
      stroke: { type: 'expression', value: 'color' },
      fill: { type: 'constant', value: '' },
      sourceArrow: { type: 'constant', value: 'None' },
      targetArrow: { type: 'constant', value: 'Default' },
    }
  )
  const { edgesSource } = await buildEdgesSourceData(
    { data, edgeCreator },
    {
      idProvider: { type: 'expression', value: 'id' },
      sourceIdProvider: { type: 'expression', value: 's' },
      targetIdProvider: { type: 'expression', value: 't' },
    }
  )
  const { graph } = await buildGraph(
    { nodesSources: [nodesSource], edgesSources: [edgesSource] },
    {}
  )

  return graph
}
