

import React from "react";
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard';
import RegionalDashboard from './Components/RegionalDashboard';
import './main.css'; 
import "./styles.css";

import MapChart from "./MapChart";

// This is temporary until JSON is obtained from API call
const fullJSONTemplate = [
  {
    name: 'United Kingdom',
    joy: 32.114051139044623,
    anger: 7.289970789215364,
    fear: 3.8105977292024447,
    sadness: 6.219883720353374,
    confident: 18.725309202150665,
    analytical: 17.76795795863539,
    tentative: 15.072229461398134,
    hash1: '#WandaVision',
    hash2: '#Pokemon',
    hash3: '#friday',
    hash4: '#FridayMotivation',
    hash5: '#FridayFeeling',
    happiest1: "Leeds",
    happiest2: "Manchester",
    happiest3: "Newcastle",
    happiest4: "London",
    happiest5: "Southampton",
    sample_size: 650
  },

  {
    name: 'Newcastle',
    joy: 31.114051139044623,
    anger: 7.289970789215364,
    fear: 3.8105977292024447,
    sadness: 6.219883720353374,
    confident: 18.725309202150665,
    analytical: 17.76795795863539,
    tentative: 15.072229461398134,
    hash1: '',
    hash2: '',
    hash3: '',
    sample_size: 65
  },
  {
    name: 'Manchester',
    joy: 33.9457936894335,
    anger: 2.079649742749094,
    fear: 0,
    sadness: 8.710716808383564,
    confident: 6.573551509992057,
    analytical: 15.492030343945443,
    tentative: 33.19825790549635,
    hash1: '',
    hash2: '',
    hash3: '',
    sample_size: 49
  },
  {
    name: 'Sheffield',
    joy: 44.22058154499701,
    anger: 0,
    fear: 0,
    sadness: 7.13702670408339,
    confident: 8.46864686997051,
    analytical: 17.265942439019092,
    tentative: 22.90780244193,
    hash1: '',
    hash2: '',
    hash3: '',
    sample_size: 62
  },
  { time: 1613142768741 }
]

// This is temporary until JSON is obtained from API call
const regioanlJSONTemplate = {
  name: 'Newcastle',
  joy: 31.114051139044623,
  anger: 7.289970789215364,
  fear: 3.8105977292024447,
  sadness: 6.219883720353374,
  confident: 18.725309202150665,
  analytical: 17.76795795863539,
  tentative: 15.072229461398134,
  hash1: 'trend1',
  hash2: 'trend2',
  hash3: 'trend3',
  sample_size: 65
}

// Find UK from the full JSON data
const findUK = (json) => {
  for(var i = 0; i < json.length; i++) {
    if(json[i].name === "United Kingdom"){
      return json[i];
    }
  }
}


// Currently the data is being passed as props to the components.
// Will need to change depending on how we fetch data from server.
//
// Maybe make App into a class component and make fetch call from 
// here?
function App() {
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
          <RegionalDashboard data={regioanlJSONTemplate}/>
        </div>
        <div className="main-dashboard">
          <Dashboard data={findUK(fullJSONTemplate)}/>
        </div>
      
      </div>
    </div>
  );
}

export default App;



