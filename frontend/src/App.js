import React from "react";
import Alert from 'react-bootstrap/Alert';
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard';
import RegionalDashboard from './Components/RegionalDashboard';
import Map from './Components/Map';
import DummyMap from './Components/DummyMap';
import './main.css'; 
import "./styles.css";

import MapChart from "./MapChart";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      mapData: [],

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
    this.setCurrentRegion = this.setCurrentRegion.bind(this);
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
              mapData: json.anlysis,
              dashboardData : this.findRegionData(json.anlysis, "United Kingdom", true),
              error:false,
            });
        }
      } catch(error){
        console.log("Failed to fetch data from the server");
        // set error to true to display error alert
        this.setState({error:true})
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
  // json - json array retrieved from json.anlysis from server
  // regionName - name of the region to search in the json array
  // forUK - boolean to alert if function is being used for the UK dashboard
  findRegionData(json, regionName, forUK=false){
    // check if mapData has been assigned a value
    // if not, then that means data hasn't been fetched,
    // so return initial data template.
    if ((this.state.mapData) || forUK) {
      for(var i = 0; i < json.length; i++) {
        if(json[i].name === regionName){
          return json[i];
        }
        // If the city doesn't exist in the json data,
        // return the previous regionalData
        if(i===json.length-1){
          return this.state.regionalData;
        }
      }
    } else{
        return this.state.regionalData;
    }
  }

  // This function is to be passed into the map component
  // so that the child map component can change parent
  // app components state for the regional dashboard
  setCurrentRegion(regionName){
    this.setState((prevState) => ({
      regionalData : this.findRegionData(prevState.mapData, regionName),
    }))
  }

  render(){

    const colourCode = {
      "Fear": "#C81B25",
      "Confident": "#3DC81B",
      "Anger": '#B033AB',
      "Joy": "#F39800",
      "Sadness": "#00AEEF",
    }

    return (
      <div className="App">
        {this.state.error && <Alert variant="danger">Failed to fetch data from server</Alert>}
        <div className="main-grid">
          <div className="header"><Navbar /></div>
          <div className="map-container">
            <Map mapData = {this.state.mapData} setCurrentRegion={this.setCurrentRegion} colourCode={colourCode}/>
          </div>
          <div className="regional-dashboard-container">
            <RegionalDashboard data={this.state.regionalData} colourCode={colourCode}/>
          </div>
          <div className="main-dashboard">
            <div className="colour-key">
              <div className="coloured-colour-key" style={{"color": colourCode.Fear}}>
                <div className="coloured-circle" style={{"background": colourCode.Fear}}/>
                Fear
              </div>
              <div className="coloured-colour-key" style={{"color": colourCode.Confident}}>
                <div className="coloured-circle" style={{"background": colourCode.Confident}}/>
                  Confident
              </div>
              <div className="coloured-colour-key" style={{"color": colourCode.Anger}}>
                <div className="coloured-circle" style={{"background": colourCode.Anger}}/>
                  Anger
              </div>
              <div className="coloured-colour-key" style={{"color": colourCode.Joy}}>
                <div className="coloured-circle" style={{"background": colourCode.Joy}}/>
                  Joy
              </div>
              <div className="coloured-colour-key" style={{"color": colourCode.Sadness}}>
                <div className="coloured-circle" style={{"background": colourCode.Sadness}}/>
                  Sadness
              </div>
            </div>
            <Dashboard data={this.state.dashboardData} colourCode={colourCode}/>
          </div>
        </div>
      </div>
    );
}
}

export default App;



