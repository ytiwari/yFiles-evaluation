import React, { Component } from 'react'
 import {Route} from 'react-router-dom';

function UIComponent(){
    return (
        <div className="demo-has-left">
        {/*
            <aside className="demo-sidebar demo-left">
            <h1 className="demo-sidebar-header">Description</h1>
            <div className="demo-sidebar-content">
                <p>
                <em>Network flow</em> algorithms apply to directed networks in which edges have certain capacities and a flow
                moves from source nodes (i.e., nodes with in-degree 0) to sink nodes (i.e., nodes with out-degree 0). </p>
                <p>
                In our everyday life, flow algorithms can be applied to all problem domains that involve networks (e.g., water
                supply, electricity/power, internet, shipment) in which the goal is to move some flow (e.g., water,
                electricity/power, products, internet traffic, message) from one position to another within the network as
                efficient as possible. </p>
                <p>
                The demo presents three flow algorithms that will be applied on a network with water pipes. The thickness of each
                edge indicates the edge capacity while the blue-colored part the flow load. The label of each edge is in form
                "flow / capacity". </p>
                <p>
                The blue part in the interior of each node indicates the flow that comes across the node through the incoming
                edges. Source nodes are bounded by a green rectangle, while sink nodes by a red rectangle. For "Minimum Cost"
                algorithm, source nodes are also the ones that can "supply" flow to the network, while sink nodes are those that
                "demand" flow from the network. </p>
                <p>
                The user can select one of the provided algorithms using the combo-box in the toolbar. The result of each
                algorithm is also visualized in the toolbar. In the case where for some reason, no feasible solution is found, the
                result will be -1. Possible changes to the flow due to another algorithm selection or user interaction are
                highlighted temporary with orange color.</p>
            </div>
            </aside>
            <aside className="demo-sidebar demo-right">
          <h1 className="demo-sidebar-header">Algorithms</h1>
          <div className="demo-sidebar-content">        
            <div id="description">
              <div id="maxFlowText">
                <h2>Maximum Flow</h2>
                The <em>maximum flow</em> problem seeks to determine the maximum load that a network can handle considering a
                capacity constraint. Applications of the maximum flow algorithm include the following:
                <ul>
                  <li>Determine the maximum amount of data that can be sent through a computer network.</li>
                  <li>Find the maximum amount of fluids (e.g. water or oil) that a network of pipelines can supply.</li>
                  <li>Calculate the amount of goods that a company can transport from warehouses to stores depending on the
                    number of available trucks and the state of the roads.
                  </li>
                </ul>
        
                <h2>Things to Try</h2>
                <ul>
                  <li>Modify the network's structure by adding or removing nodes and edges.</li>
                  <li>Drag an edge to increase or decrease its capacity.</li>
                  <li>Press button <img src="../../resources/icons/reload-16.svg"/> of the toolbar to load the initial graph.</li>
                  <li>Press button <img src="../../resources/icons/play2-16.svg"/> of the toolbar to layout the existing graph.
                  </li>
                </ul>
              </div>
        
              <div id="minCostFlowText">
                <h2>Minimum Cost Flow</h2>
                The <em>minimum cost flow</em> describes the flow through a network that produces the lowest cost. The solution
                depends on the edges' capacity and cost. Some nodes can supply flow to the network while others can demand flow
                from the network. Applications of the minimum cost algorithm include the following:
                <ul>
                  <li>Find the parts in pipelines or data networks that handle the most flow and would affect the flow the most
                    when they fail.
                  </li>
                  <li>Find the most efficient flight passenger lift in which passengers can leave/board the plane at every stop
                    to prevent empty flights.
                  </li>
                  <li>Find the optimal location for facilities based on their connection with the surrounding neighborhood (e.g.
                    hospitals, fire stations).
                  </li>
                  <li>Solve the transportation problem where a certain demand of goods must by satisfied by a number of
                    warehouses such that the transportation costs are minimized.
                  </li>
                </ul>
        
                <h2>Things to Try</h2>
                <ul>
                  <li>Modify the network's structure by adding or removing nodes and edges.</li>
                  <li>Drag an edge to increase/decrease its capacity.</li>
                  <li>Drag the blue-part of a node to increase its supply or demand. The label in the interior of the node
                    indicates the flow that comes across after the algorithm has been applied plus/minus the corresponding
                    supply/demand respectively. Nodes bounded by a green rectangle represent "supply" nodes, while nodes bounded
                    by a red rectangle represent "demand" nodes.
                  </li>
                  <li>Click on a "cost" label and use <img src="resources/plus-16.svg"/> and <img src="resources/minus-16.svg"/> of the popup menu to increase or decrease the
                    edge's cost. Press <img src="resources/apply-16.svg"/> to apply the algorithm.
                  </li>
                  <li>Press button <img src="../../resources/icons/reload-16.svg"/> of the toolbar to load the initial graph.
                  </li>
                  <li>Press button <img src="../../resources/icons/play2-16.svg"/> of the toolbar to layout the existing graph.
                  </li>
                </ul>
              </div>
        
              <div id="maxFlowMinCutText">
                <h2>Maximum Flow Minimum Cut</h2>
                The <em>maximum flow minimum cut</em> problem determines the maximum amount of flow that can be sent through the
                network and calculates the <em>minimum cut</em>. A cut separates the network such that source and sink nodes are
                disconnected and no flow from the source can reach the sink. The <em>minimum cut</em> is the cut with the
                minimum capacity and its value equals to the <em>maximum flow</em>. Applications of the maximum flow minimum cut
                algorithm include the following:
                <ul>
                  <li>Determine a maximum bipartite matching in a general graph.</li>
                  <li>Calculate the maximum flow of a network.</li>
                  <li>Find a parking spot for each car that minimizes the total time required for all cars to find a spot.</li>
                </ul>
        
                <h2>Things to Try</h2>
                <ul>
                  <li>Modify the network's structure by adding or removing nodes and edges.</li>
                  <li>Drag an edge to increase or decrease its capacity.</li>
                  <li>Take a look at the min-cult line to determine the edges that belong to the cut.</li>
                  <li>Press button <img src="../../resources/icons/reload-16.svg"/> of the toolbar to load the initial graph.
                  </li>
                  <li>Press button <img src="../../resources/icons/play2-16.svg"/> of the toolbar to layout the existing graph.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
                  */}
        <div className="demo-content">
            {/*
                 <div className="demo-toolbar">
        
            <button id="newButton" data-command="New" title="New" className="demo-icon-yIconNew"></button>
        
            
        
            <span className="demo-separator"></span>
        
            <button data-command="Undo" title="Undo" className="demo-icon-yIconUndo"></button>
            <button data-command="Redo" title="Redo" className="demo-icon-yIconRedo"></button>
        
            <span className="demo-separator"></span>
        
            <select data-command="AlgorithmSelectionChanged" title="Select a graph analysis algorithm" id="algorithmComboBox">
              <option>Maximum Flow </option>
              <option>Minimum Cost </option>
              <option>Maximum Flow/Minimum Cut </option>
            </select>
        
            <span data-type="Separator"></span>
        
            <button id="reloadButton" data-command="Reload" title="Reload Initial Graph" className="demo-icon-yIconReload"></button>
            <button id="layoutButton" data-command="Layout" title="Layout" className="demo-icon-yIconLayout"></button>
        
            <span className="demo-separator"></span>
        
            <label id="flowInformationLabel" style={{display: 'none'}}></label> <input id="flowValue" readOnly />
          </div>
            
            */ }   
          
          <div id="graphComponent">
            <div id="edgePopupContent" className="popupContent" tabindex="0">
              <div id="popupContentInfo">
                <label>Cost (&euro;): </label>
                <button id="costMinus" title="Decrease"></button>
                <input type="text" id="cost-form" value="1" min="1" readOnly/>
                <button id="costPlus" title="Increase"></button>
                <span className="popupSeparator"></span>
                <button id="apply" title="Apply"></button>
              </div>
            </div>
          </div>
        </div>
        </div>

    );
}

export default UIComponent;

