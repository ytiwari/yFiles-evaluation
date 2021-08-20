import React, { Component } from 'react'

function UIComponent(){
    return (
        <body className="demo-has-left">
        <aside className="demo-sidebar demo-left">
          <h1 className="demo-sidebar-header">Description</h1>
          <div className="demo-sidebar-content">
            <p>This demo shows a basic network monitoring tool.</p>
        
            <p>You can watch the traffic flowing through the network and even influence the network by deactivating nodes.</p>
        
            <p>The network consists of PCs, Laptops, Tablets, Servers, Databases and Routers. The color of a connection depicts
              its traffic load and changes from green to yellow to red. The traffic load of a node is shown on its control panel
              pop-up.</p>
        
            <p>The bar charts in the node popups are created using <a href="https://d3js.org/" target="_blank">D3.js</a>.</p>
        
            <h2>Things to Try</h2>
        
            <h3>Show/Hide Node Control Panel</h3>
        
            <p>Every node has a control panel that shows its name, IP address and traffic load. You can show this panel by
              clicking on the node. Close the panel by clicking on the empty canvas area, or open the panel of another
              node.</p>
        
            <h3>(De)activate Nodes</h3>
        
            <p>The control panel contains a power button that turns a node on and off. Deactivated nodes do not process data.
              This way you can influence the data flow and watch what happens when nodes fail.</p>
        
            <h3>Enable Failures</h3>
        
            <p>When enabled, nodes and edges fail randomly and cannot process data anymore. Broken elements are marked with a
              stop sign. If a failure happens outside the current viewport, the viewport will focus on the broken element.</p>
        
            <h3>Repair Failures</h3>
        
            <p>You can repair a failed element by clicking it.</p>
        
            <h2>Mouse Interaction</h2>
        
            <h3>Mouse wheel</h3>
        
            <p>Changes the zoom level of the view.</p>
        
            <h3>Left mouse drag</h3>
        
            <p>Moves the diagram within the view.</p>
        
            <h3>Clicking a node</h3>
        
            <p>Opens the control panel for that node.</p>
        
            <h3>Hover over a node or an edge</h3>
        
            <p>Shows the load of that element.</p>
        
            <h3>Hover over a load indicator in the control panel</h3>
        
            <p>Shows the load of that node.</p>
        
            <h3>Clicking a broken node or edge</h3>
        
            <p>Repairs that element.</p>
          </div>
        </aside>
        
        <div className="demo-content">
        
          <div className="demo-toolbar">
        
            <button data-command="ZoomIn" title="Zoom In" className="demo-icon-yIconZoomIn"></button>
            <button data-command="ZoomOut" title="Zoom Out" className="demo-icon-yIconZoomOut"></button>
            <button data-command="FitContent" title="Fit Content" className="demo-icon-yIconZoomFit"></button>
            <span className="demo-separator"></span>
            <input type="checkbox" id="toggleFailures" className="demo-toggle-button labeled" title="Simulate Failures" data-command="ToggleFailures"/><label for="toggleFailures">Simulate Failures</label>
            <span className="demo-separator"></span>
            <input type="checkbox" id="toggleLabels" className="demo-toggle-button labeled" title="Toggle Node Labels" data-command="ToggleLabels"/><label for="toggleLabels">Toggle Labels</label>
            <span className="demo-separator"></span>
            <input type="checkbox" id="pause" className="demo-toggle-button labeled" title="Pause Simulation" data-command="PauseSimulation"/><label for="pause">Pause Simulation</label>
          </div>
        
          <div id="graphComponent">
            <div id="nodePopupContent" className="popupContent" tabindex="0">
              <div className="popupContentInfo">
               
                <div id="powerButton" title="Power On/Off">
               
                    
                     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                              width="25px" height="25px" viewBox="0 0 25 25" xmlSpace="preserve">
                              <path d="m 6.0040426,5.028485 a 10,10 0 1 0 12.0000004,0 m -6,-3 0,10" id="powerButton-path"></path>
                            </svg>
               
                 
                </div>
                
                <div data-id="name" style={{fontSize:'14px',fontWeight:'bold',marginBottom:'4px'}}></div>
                <div data-id="ip" style={{marginBottom:'4px'}}></div>
                <div id="closeButton" title="Close this label">&#x274c;</div>
              </div>
              <svg className="chart"></svg>
              <div className="nodePointer">&#x25BC;</div>
            </div>
          </div>
        </div>
        
        </body>

    );
}

export default UIComponent;

