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
import { project } from './Projection'
import { parseJson } from './JSONParser'
import {
  buildEdgeCreator,
  buildEdgesSourceData,
  buildGraph,
  buildNodeCreator,
  buildNodesSourceData,
} from './GraphBuilder'
import { arrange } from './Layout'

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
        '{\n  "nodes": [\n    {\n      "position": "Chief Executive Officer",\n      "name": "Eric Joplin",\n      "email": "ejoplin@yoyodyne.com",\n      "phone": "555-0100",\n      "fax": "555-0101",\n      "businessUnit": "Executive Unit",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Chief Executive Assistant",\n      "name": "Gary Roberts",\n      "email": "groberts@yoyodyne.com",\n      "phone": "555-0100",\n      "fax": "555-0101",\n      "businessUnit": "Executive Unit",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Senior Executive Assistant",\n      "name": "Alexander Burns",\n      "email": "aburns@yoyodyne.com",\n      "phone": "555-0102",\n      "fax": "555-0103",\n      "businessUnit": "Executive Unit",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Junior Executive Assistant",\n      "name": "Linda Newland",\n      "email": "lnewland@yoyodyne.com",\n      "phone": "555-0112",\n      "fax": "555-0113",\n      "businessUnit": "Executive Unit",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female1.svg"\n    },\n    {\n      "position": "Vice President of Production",\n      "name": "Amy Kain",\n      "email": "akain@yoyodyne.com",\n      "phone": "555-0106",\n      "fax": "555-0107",\n      "businessUnit": "Production",\n      "status": "unavailable",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female2.svg"\n    },\n    {\n      "position": "Quality Assurance Manager",\n      "name": "Dorothy Turner",\n      "email": "dturner@yoyodyne.com",\n      "phone": "555-0108",\n      "fax": "555-0109",\n      "businessUnit": "Production",\n      "status": "unavailable",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female3.svg"\n    },\n    {\n      "position": "Quality Assurance Supervisor",\n      "name": "Valerie Burnett",\n      "email": "vburnett@yoyodyne.com",\n      "phone": "555-0110",\n      "fax": "555-0111",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female1.svg"\n    },\n    {\n      "position": "Quality Assurance Technician",\n      "name": "Martin Cornett",\n      "email": "mcornett@yoyodyne.com",\n      "phone": "555-0114",\n      "fax": "555-0115",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Document Control Manager",\n      "name": "Edward Monge",\n      "email": "emonge@yoyodyne.com",\n      "phone": "555-0118",\n      "fax": "555-0119",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Control Specialist",\n      "name": "Howard Meyer",\n      "email": "hmeyer@yoyodyne.com",\n      "phone": "555-0116",\n      "fax": "555-0117",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Document Control Assistant",\n      "name": "Lisa Jensen",\n      "email": "ljensen@yoyodyne.com",\n      "phone": "555-0120",\n      "fax": "555-0121",\n      "businessUnit": "Production",\n      "status": "travel",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female2.svg"\n    },\n    {\n      "position": "Master Scheduler",\n      "name": "Larry Littlefield",\n      "email": "llittlefield@yoyodyne.com",\n      "phone": "555-0126",\n      "fax": "555-0127",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Scheduling Assistant",\n      "name": "Rico Cronin",\n      "email": "rcronin@yoyodyne.com",\n      "phone": "555-0128",\n      "fax": "555-0129",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Facilities Manager",\n      "name": "Anne Binger",\n      "email": "abinger@yoyodyne.com",\n      "phone": "555-0122",\n      "fax": "555-0123",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female2.svg"\n    },\n    {\n      "position": "Facilities Administrative Assistant",\n      "name": "Timothy Jackson",\n      "email": "tjackson@yoyodyne.com",\n      "phone": "555-0140",\n      "fax": "555-0141",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Maintenance Supervisor",\n      "name": "Carmen Shortened",\n      "email": "cshortened@yoyodyne.com",\n      "phone": "555-0142",\n      "fax": "555-0143",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female1.svg"\n    },\n    {\n      "position": "Janitor",\n      "name": "Thomas Stark",\n      "email": "tstark@yoyodyne.com",\n      "phone": "555-0144",\n      "fax": "555-0145",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Shipping and Receiving Supervisor",\n      "name": "Ray Hammond",\n      "email": "rhammond@yoyodyne.com",\n      "phone": "555-0146",\n      "fax": "555-0147",\n      "businessUnit": "Production",\n      "status": "travel",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Shipping and Receiving Clerk",\n      "name": "Bob Lacey",\n      "email": "blacey@yoyodyne.com",\n      "phone": "555-0124",\n      "fax": "555-0125",\n      "businessUnit": "Production",\n      "status": "travel",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Stocker",\n      "name": "Ronnie Garcia",\n      "email": "rgarcia@yoyodyne.com",\n      "phone": "555-0130",\n      "fax": "555-0131",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Production Supervisor",\n      "name": "Kathy Maxwell",\n      "email": "kmaxwell@yoyodyne.com",\n      "phone": "555-0132",\n      "fax": "555-0133",\n      "businessUnit": "Production",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female3.svg"\n    },\n    {\n      "position": "Vice President of Sales",\n      "name": "Richard Fuller",\n      "email": "rfuller@yoyodyne.com",\n      "phone": "555-0134",\n      "fax": "555-0135",\n      "businessUnit": "Sales",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "North America Sales Manager",\n      "name": "Joe Vargas",\n      "email": "jvargas@yoyodyne.com",\n      "phone": "555-0136",\n      "fax": "555-0137",\n      "businessUnit": "Sales",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Sales Representative",\n      "name": "Robert Parson",\n      "email": "rparson@yoyodyne.com",\n      "phone": "555-0150",\n      "fax": "555-0151",\n      "businessUnit": "Sales",\n      "status": "travel",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Sales Representative",\n      "name": "Melissa Noren",\n      "email": "mnoren@yoyodyne.com",\n      "phone": "555-0152",\n      "fax": "555-0153",\n      "businessUnit": "Sales",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female1.svg"\n    },\n    {\n      "position": "European Sales Manager",\n      "name": "Robert Hartman",\n      "email": "rhartman@yoyodyne.com",\n      "phone": "555-0138",\n      "fax": "555-0139",\n      "businessUnit": "Sales",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Sales Representative",\n      "name": "Rebecca Polite",\n      "email": "rpolite@yoyodyne.com",\n      "phone": "555-0148",\n      "fax": "555-0149",\n      "businessUnit": "Sales",\n      "status": "travel",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female3.svg"\n    },\n    {\n      "position": "Sales Representative",\n      "name": "Michael Daniels",\n      "email": "mdaniels@yoyodyne.com",\n      "phone": "555-0154",\n      "fax": "555-0155",\n      "businessUnit": "Sales",\n      "status": "travel",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Chief Financial Officer",\n      "name": "David Kerry",\n      "email": "dkerry@yoyodyne.com",\n      "phone": "555-0180",\n      "fax": "555-0181",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Accounts Manager",\n      "name": "Walter Hastings",\n      "email": "whastings@yoyodyne.com",\n      "phone": "555-0182",\n      "fax": "555-0183",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Accounts Receivable Specialist",\n      "name": "Susan Moran",\n      "email": "smoran@yoyodyne.com",\n      "phone": "555-0184",\n      "fax": "555-0185",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female3.svg"\n    },\n    {\n      "position": "Accountant",\n      "name": "Melvin Cruz",\n      "email": "mcruz@yoyodyne.com",\n      "phone": "555-0186",\n      "fax": "555-0187",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Accounts Payable Specialist",\n      "name": "Rachel King",\n      "email": "rking@yoyodyne.com",\n      "phone": "555-0188",\n      "fax": "555-0189",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female2.svg"\n    },\n    {\n      "position": "Finance Manager",\n      "name": "Joy Medico",\n      "email": "jmedico@yoyodyne.com",\n      "phone": "555-0190",\n      "fax": "555-0191",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female3.svg"\n    },\n    {\n      "position": "Purchasing Manager",\n      "name": "Edward Lewis",\n      "email": "elewis@yoyodyne.com",\n      "phone": "555-0192",\n      "fax": "555-0193",\n      "businessUnit": "Accounting",\n      "status": "unavailable",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Purchasing Assistant",\n      "name": "Mildred Bean",\n      "email": "mbean@yoyodyne.com",\n      "phone": "555-0194",\n      "fax": "555-0195",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female2.svg"\n    },\n    {\n      "position": "Buyer",\n      "name": "Raymond Lindley",\n      "email": "rlindley@yoyodyne.com",\n      "phone": "555-0196",\n      "fax": "555-0197",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Human Resource Manager",\n      "name": "Danny Welch",\n      "email": "dwelch@yoyodyne.com",\n      "phone": "555-0198",\n      "fax": "555-0199",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male1.svg"\n    },\n    {\n      "position": "Human Resource Administrative Assistant",\n      "name": "Leroy Vison",\n      "email": "lvison@yoyodyne.com",\n      "phone": "555-0200",\n      "fax": "555-0201",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    },\n    {\n      "position": "Benefits Specialist",\n      "name": "Mark Parks",\n      "email": "mparks@yoyodyne.com",\n      "phone": "555-0202",\n      "fax": "555-0203",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male3.svg"\n    },\n    {\n      "position": "Recruiter",\n      "name": "Linda Lenhart",\n      "email": "llenhart@yoyodyne.com",\n      "phone": "555-0204",\n      "fax": "555-0205",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_female1.svg"\n    },\n    {\n      "position": "Assistant to CFO",\n      "name": "Aaron Buckman",\n      "email": "abuckman@yoyodyne.com",\n      "phone": "555-0210",\n      "fax": "555-0211",\n      "businessUnit": "Accounting",\n      "status": "present",\n      "icon": "https://live.yworks.com/demos/complete/interactiveorgchart/resources/usericon_male2.svg"\n    }\n  ],\n  "edges": [\n    { "from": "Eric Joplin", "to": "Gary Roberts" },\n    { "from": "Eric Joplin", "to": "Amy Kain" },\n    { "from": "Eric Joplin", "to": "Richard Fuller" },\n    { "from": "Eric Joplin", "to": "David Kerry" },\n    { "from": "Gary Roberts", "to": "Alexander Burns" },\n    { "from": "Gary Roberts", "to": "Linda Newland" },\n    { "from": "Amy Kain", "to": "Dorothy Turner" },\n    { "from": "Amy Kain", "to": "Larry Littlefield" },\n    { "from": "Amy Kain", "to": "Anne Binger" },\n    { "from": "Amy Kain", "to": "Ray Hammond" },\n    { "from": "Amy Kain", "to": "Kathy Maxwell" },\n    { "from": "Richard Fuller", "to": "Joe Vargas" },\n    { "from": "Richard Fuller", "to": "Robert Hartman" },\n    { "from": "David Kerry", "to": "Aaron Buckman" },\n    { "from": "David Kerry", "to": "Joy Medico" },\n    { "from": "David Kerry", "to": "Walter Hastings" },\n    { "from": "David Kerry", "to": "Danny Welch" },\n    { "from": "Dorothy Turner", "to": "Valerie Burnett" },\n    { "from": "Dorothy Turner", "to": "Edward Monge" },\n    { "from": "Larry Littlefield", "to": "Rico Cronin" },\n    { "from": "Anne Binger", "to": "Timothy Jackson" },\n    { "from": "Ray Hammond", "to": "Bob Lacey" },\n    { "from": "Ray Hammond", "to": "Ronnie Garcia" },\n    { "from": "Joe Vargas", "to": "Robert Parson" },\n    { "from": "Joe Vargas", "to": "Melissa Noren" },\n    { "from": "Robert Hartman", "to": "Rebecca Polite" },\n    { "from": "Robert Hartman", "to": "Michael Daniels" },\n    { "from": "Walter Hastings", "to": "Susan Moran" },\n    { "from": "Walter Hastings", "to": "Melvin Cruz" },\n    { "from": "Walter Hastings", "to": "Rachel King" },\n    { "from": "Joy Medico", "to": "Edward Lewis" },\n    { "from": "Danny Welch", "to": "Leroy Vison" },\n    { "from": "Danny Welch", "to": "Mark Parks" },\n    { "from": "Danny Welch", "to": "Linda Lenhart" },\n    { "from": "Valerie Burnett", "to": "Martin Cornett" },\n    { "from": "Edward Monge", "to": "Lisa Jensen" },\n    { "from": "Edward Monge", "to": "Howard Meyer" },\n    { "from": "Timothy Jackson", "to": "Carmen Shortened" },\n    { "from": "Timothy Jackson", "to": "Thomas Stark" },\n    { "from": "Edward Lewis", "to": "Mildred Bean" },\n    { "from": "Edward Lewis", "to": "Raymond Lindley" }\n  ]\n}\n',
    }
  )
  const { data } = await parseJson({ text: value }, {})
  const { out } = await project(
    { in: data },
    { binding: { type: 'expression', value: 'nodes' } }
  )
  const { out: out2 } = await project(
    { in: data },
    { binding: { type: 'expression', value: 'edges' } }
  )
  const { nodeCreator } = await buildNodeCreator(
    {},
    {
      tagProvider: { type: 'expression', value: '' },
      isGroupProvider: { type: 'expression', value: '' },
      styleBindings: '',
      layout: { type: 'expression', value: '' },
      x: { type: 'expression', value: '' },
      y: { type: 'expression', value: '' },
      width: { type: 'constant', value: 285 },
      height: { type: 'constant', value: 100 },
      styleProvider: 'VueJSNodeStyle',
      fill: { type: 'constant', value: '#222' },
      shape: { type: 'constant', value: 'Round Rectangle' },
      stroke: { type: 'expression', value: 'color' },
      image: { type: 'constant', value: '' },
      template:
        '<g>\n<rect fill="#FFFFFF" stroke="#C0C0C0" :width="layout.width" :height="layout.height"></rect>\n<rect v-if="tag.status === \'present\'" :width="layout.width" :height="zoom < 0.4 ? layout.height : zoom < 0.7 ? \'10\' : \'5\'" fill="#55B757" class="node-background"></rect>\n<rect v-else-if="tag.status === \'busy\'" :width="layout.width" :height="zoom < 0.4 ? layout.height : zoom < 0.7 ? \'10\' : \'5\'" fill="#E7527C" class="node-background"></rect>\n<rect v-else-if="tag.status === \'travel\'" :width="layout.width" :height="zoom < 0.4 ? layout.height : zoom < 0.7 ? \'10\' : \'5\'" fill="#9945E9" class="node-background"></rect>\n<rect v-else-if="tag.status === \'unavailable\'" :width="layout.width" :height="zoom < 0.4 ? layout.height : zoom < 0.7 ? \'10\' : \'5\'" fill="#8D8F91" class="node-background"></rect>\n<rect v-if="highlighted || selected" fill="transparent" :stroke="selected ? \'#FFBB33\' : \'#249ae7\'" stroke-width="3"\n  :width="layout.width-3" :height="layout.height-3" x="1.5" y="1.5"></rect>\n<!--the template for detailNodeStyle-->\n<template v-if="zoom >= 0.7">\n  <image :xlink:href="tag.icon" x="15" y="10" width="63.75" height="63.75"></image>\n  <image :xlink:href="\'https://live.yworks.com/demos/complete/interactiveorgchart/resources/\' + tag.status + \'_icon.svg\'" x="25" y="80" height="15" width="60"></image>\n  <g style="font-size:10px; font-family:Roboto,sans-serif; font-weight: 300; fill: #444">\n    <text transform="translate(100 25)" style="font-size:16px; fill:#336699">{{tag.name}}</text>\n    <!-- use the VuejsNodeStyle svg-text template which supports wrapping -->\n    <svg-text x="100" y="35" :width="layout.width - 140" :content="tag.position.toUpperCase()" :line-spacing="0.2" font-size="10" font-family="Roboto,sans-serif" :wrapping="3"></svg-text>\n    <text transform="translate(100 72)" >{{tag.email}}</text>\n    <text transform="translate(100 88)" >{{tag.phone}}</text>\n    <text transform="translate(170 88)" >{{tag.fax}}</text>\n  </g>\n</template>\n<!--the template for intermediateNodeStyle-->\n<template v-else-if="zoom >= 0.4">\n  <image :xlink:href="tag.icon" x="15" y="20" width="56.25" height="56.25"/>\n  <g style="font-size:15px; font-family:Roboto,sans-serif; fill:#444" width="185">\n    <text transform="translate(75 40)" style="font-size:26px; font-family:Roboto,sans-serif; fill:#336699">{{tag.name}}</text>\n    <!-- use the VuejsNodeStyle svg-text template which supports wrapping -->\n    <svg-text x="75" y="50" :width="layout.width - 85" :content="tag.position.toUpperCase()" :line-spacing="0.2" font-size="15" font-family="Roboto,sans-serif" :wrapping="3"></svg-text>\n  </g>\n</template>\n<!--the template for overviewNodeStyle-->\n<template v-else>\n  <!--converts a name to an abbreviated name-->\n  <text transform="translate(30 50)" style="font-size:40px; font-family:Roboto,sans-serif; fill:#fff; dominant-baseline: central;">\n    {{tag.name.replace(/^(.)(\\S*)(.*)/, \'$1.$3\')}}\n  </text>\n</template>\n</g>\n',
    }
  )
  const { nodesSource } = await buildNodesSourceData(
    { data: out, nodeCreator },
    {
      idProvider: { type: 'expression', value: 'name' },
      parentIdProvider: { type: 'expression', value: '' },
    }
  )
  const { edgeCreator } = await buildEdgeCreator(
    {},
    {
      tagProvider: { type: 'expression', value: '' },
      stroke: { type: 'expression', value: 'color' },
      fill: { type: 'constant', value: '' },
      sourceArrow: { type: 'constant', value: 'None' },
      targetArrow: { type: 'constant', value: 'None' },
    }
  )
  const { edgesSource } = await buildEdgesSourceData(
    { data: out2, edgeCreator },
    {
      idProvider: { type: 'expression', value: '' },
      sourceIdProvider: { type: 'expression', value: 'from' },
      targetIdProvider: { type: 'expression', value: 'to' },
    }
  )
  const { graph } = await buildGraph(
    { nodesSources: [nodesSource], edgesSources: [edgesSource] },
    {}
  )
  const { out: out3 } = await arrange(
    { in: graph },
    {
      layoutStyle: 'tree',
      layoutOrientation: 'top-to-bottom',
      edgeLabeling: true,
      edgeLength: 40,
      nodeDistance: 30,
      edgeGrouping: true,
      compactness: 0.5,
      gridSpacing: 20,
      circularLayoutStyle: 'bcc-compact',
      gridColumns: { type: 'expression', value: '' },
      gridRows: { type: 'expression', value: '' },
    }
  )

  return out3
}
