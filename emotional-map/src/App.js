

import React from "react";
import Alert from 'react-bootstrap/Alert';
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
        trend1: 'Loading...',
        trend2: 'Loading...',
        trend3: 'Loading...',
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
        trend1: 'Loding...',
        trend2: 'Loding...',
        trend3: 'Loding...',
        trend4: 'Loding...',
        trend5: 'Loding...',
        happiest1: "Loding...",
        happiest2: "Loding...",
        happiest3: "Loding...",
        happiest4: "Loding...",
        happiest5: "Loding...",
        sample_size: "Loding..."
      },
      error: false, // notify server errors 
    }
    this.findRegionData = this.findRegionData.bind(this);
  }

  componentDidMount() {
    let fetchData = async () => {
      // fetch from "http://127.0.0.1:8020/api/recent" i.e. server
      const URL = "/api/recent"
      try {
        let result = await fetch(URL);
        if (!result.ok) {
          throw new Error(`HTTP error - status: ${result.status}`);
        }
        else{
          let json = await result.json();
          this.setState({
              regionalData : this.findRegionData(json.anlysis, "Manchester"), // this is an example. regionName parameter could be collected from map mouseover? 
              dashboardData : this.findRegionData(json.anlysis, "United Kingdom"),
              mapData: false,
              error: false
            });
        }
      } catch(error){
        console.log(error);
        // set error to true to display error alert
        this.setState({...this.state, error:true})
      }
    }

    // Carry out an initial fetching of data before interval is set
    fetchData();

    // Fetch data from server every X milliseconds
    this.interval = setInterval(() => {
      console.log("Fetched new data")
      fetchData();
    }, 10000);
  }
  
  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
  }

  // find JSON data relating to the specified region from the
  // data received from the server.
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
        {this.state.error && <Alert variant="danger">Failed to fetch data from server</Alert>}
        <div className="main-grid">
          <div className="header"><Navbar /></div>
          <div className="map-container"></div>
          <div className="regional-dashboard-container">
            <RegionalDashboard data={this.state.regionalData}/>
          </div>
          <div className="main-dashboard">
            <div className="colour-key">
              <div className="red-colour-key">
                <div className="red-circle"/>
                Fear
              </div>
              <div className="green-colour-key">
                <div className="green-circle"/>
                  Confident
              </div>
              <div className="purple-colour-key">
                <div className="purple-circle"/>
                  Anger
              </div>
              <div className="orange-colour-key">
                <div className="orange-circle"/>
                  Joy
              </div>
              <div className="blue-colour-key">
                <div className="blue-circle"/>
                  Sadness
              </div>
            </div>
            <Dashboard data={this.state.dashboardData}/>
          </div>
        </div>
      </div>
    );
}
}

export default App;



