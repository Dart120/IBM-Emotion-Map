

import React from "react";
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard';
import RegionalDashboard from './Components/RegionalDashboard';
import './main.css'; 
import "./styles.css";

import MapChart from "./MapChart";

class App extends React.Component {
  constructor(){
    super();
    // NOTE TO TEMI: May need to change how data is being passed into 
    // regional dashboard depending on how the hover functionality is
    // implemented. May need to change this.state.regionalData as well
    // depending on this change.
    // this.state.regionalData resembles the format of the data passed into
    // the regional dashboard component.
    this.state = {
      regionalData: {
        name: 'Loading...',
        joy: 0,
        anger: 0,
        fear: 0,
        sadness: 0,
        confident: 0,
        analytical: 0,
        tentative: 0,
        hash1: 'Loading...',
        hash2: 'Loading...',
        hash3: 'Loading...',
        sample_size: 'Loading...'
      },

      dashboardData: {
        name: 'United Kingdom',
        joy: 0,
        anger: 0,
        fear: 0,
        sadness: 0,
        confident: 0,
        analytical: 0,
        tentative: 0,
        hash1: 'Loding...',
        hash2: 'Loding...',
        hash3: 'Loding...',
        hash4: 'Loding...',
        hash5: 'Loding...',
        happiest1: "Loding...",
        happiest2: "Loding...",
        happiest3: "Loding...",
        happiest4: "Loding...",
        happiest5: "Loding...",
        sample_size: "Loding..."
      },
    }
    this.findRegionData = this.findRegionData.bind(this);
  }

  componentDidMount() {
    // delete code inside and fetch data from localhost
    let fetchData = () => {
      const URL = "/api/recent"
      fetch(URL, {
      })
        .then(res => res.json())
        //.then(json => console.log((json.anlysis)));
        .then(json => this.setState({
          regionalData : this.findRegionData(json.anlysis, "Manchester"), // this is an example. regionName parameter could be collected from map mouseover? 
          dashboardData : this.findRegionData(json.anlysis, "United Kingdom"),
          mapData: false
        }) 
        );
    }

    // Carry out an initial fetching of data before interval is set
    fetchData();

    // Fetch data from server every X milliseconds
    this.interval = setInterval(() => {
      console.log("testing")
      fetchData();
    }, 5000);
  }
  
  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
  }

  
  findRegionData(json, regionName){
    for(var i = 0; i < json.length; i++) {
      if(json[i].name === regionName){
        return json[i];
      }
    }
  }

  render(){
    return (
      // <div className="page">
      //   <Navbar />
      //   {useIsLarge ? <ComputerView /> : <MobileView />}
      // </div>
      <div className="App">
        <div className="main-grid">
          <div className="header"><Navbar /></div>
          <div className="map-container"></div>
          <div className="regional-dashboard-container">
            <RegionalDashboard data={this.state.regionalData}/>
          </div>
          <div className="main-dashboard">
            <Dashboard data={this.state.dashboardData}/>
          </div>
        
        </div>
      </div>
    );
}
}

export default App;



