 import React, { Component } from 'react'
 import {Route} from 'react-router-dom';
 import './App.css'
 import MainHeader from './components/MainHeader'
 import Example1 from './components/Example1'
 import Example2 from './components/Example2'
 import ReactGraphComponent from './components/rect-graph/ReactGraphComponent';
 import SampleCSVComponent from './components/sample-csv/sampleCsv';
 import OrganisationalChart from './components/organisational/OrganisationalChart';
 import TransitivityReactDemo from './components/transitivity/TransitivityReactDemo';
 import DemoDescription from './components/DemoDescription.jsx'
 import yLogo from './assets/ylogo.svg'
 import DemoDataPanel from './components/DemoDataPanel.jsx'
 

function App(){
    return (
      <div>
        <MainHeader/>
        <main>
        <Route exact={true} path='/Tripudio-PLM' component={Example1} />
        <Route exact={true} path='/Tripudio-PLM/example1' component={Example1} />
        <Route exact={true} path='/Tripudio-PLM/example2' component={Example2} />
        <Route exact={true} path='/Tripudio-PLM/example3' component={ReactGraphComponent} />
        <Route exact={true} path='/Tripudio-PLM/example4' component={SampleCSVComponent} />
        <Route exact={true} path='/Tripudio-PLM/example5' component={OrganisationalChart} />
        <Route exact={true} path='/Tripudio-PLM/example6' component={TransitivityReactDemo} />
        </main>
      </div>
    );
}

export default App;