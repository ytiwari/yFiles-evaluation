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

import React, { Component } from 'react'
import './Toolbar.scss'
import { eventBus } from '../../lib-org/EventBus'
import { ExportFormat } from '../../lib-org/ExportSupport'

export default class Toolbar extends Component {
  zoomIn() {
    eventBus.dispatch('zoom-in')
  }
  zoomOut() {
    eventBus.dispatch('zoom-out')
  }
  zoomFit() {
    eventBus.dispatch('zoom-fit')
  }
  clear() {
    eventBus.dispatch('clear')
  }

  undo() {
    eventBus.dispatch('undo')
  }

  redo() {
    eventBus.dispatch('redo')
  }
  open() {
    eventBus.dispatch('open')
  }

  save() {
    eventBus.dispatch('save')
  }
  exportSvg() {
    eventBus.dispatch('export', ExportFormat.SVG)
  }
  exportPng() {
    eventBus.dispatch('export', ExportFormat.PNG)
  }
  exportPdf() {
    eventBus.dispatch('export', ExportFormat.PDF)
  }
  print() {
    eventBus.dispatch('print')
  }
  searchChange(event) {
    eventBus.dispatch('search-query-input', event.target.value)
  }

  render() {
    return (
      <div className="toolbar">
        <button
          title="Clear Diagram"
          className="demo-icon-yIconNew"
          onClick={this.clear}
        />
        <span className="separator" />

        <button
          title="Open GraphML file"
          className="demo-icon-yIconOpen"
          onClick={this.open}
        />
        <button
          title="Save GraphML file"
          className="demo-icon-yIconSave"
          onClick={this.save}
        />
        <span className="separator" />

        <button
          title="Export as SVG"
          className="labeled"
          onClick={this.exportSvg}
        >
          SVG
        </button>
        <button
          title="Export as PNG"
          className="labeled"
          onClick={this.exportPng}
        >
          PNG
        </button>
        <button
          title="Export as PDF"
          className="labeled"
          onClick={this.exportPdf}
        >
          PDF
        </button>
        <span className="separator" />

        <button
          title="Print diagram"
          className="demo-icon-yIconPrint"
          onClick={this.print}
        />
        <span className="separator" />

        <button
          title="Undo"
          className="demo-icon-yIconUndo"
          onClick={this.undo}
        />
        <button
          title="Redo"
          className="demo-icon-yIconRedo"
          onClick={this.redo}
        />
        <span className="separator" />
        <button
          title="Increase Zoom"
          className="demo-icon-yIconZoomIn"
          onClick={this.zoomIn}
        />
        <button
          title="Decrease Zoom"
          className="demo-icon-yIconZoomOut"
          onClick={this.zoomOut}
        />
        <button
          title="Fit Graph Bounds"
          className="demo-icon-yIconZoomFit"
          onClick={this.zoomFit}
        />

        <span className="spacer" />
        <input
          className="search"
          placeholder="Search Nodes"
          onChange={this.searchChange}
        />
      </div>
    )
  }
}
