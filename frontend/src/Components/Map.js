import React, {useState, useEffect} from "react";
import "../index.css";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import datum from '../output1.json'
import Region from './Region'


function Map(props) {
  const [colours,setColours] = useState({})
  const mapData = props.mapData
  const colourCode = props.colourCode
  useEffect(() => {
    function calcColour(regionData) {
      let max = 0
      let colour = ''
      for (let key in colourCode){
        if (regionData[key] > max){
          colour = colourCode[key]
        }
      return colour
      }
    }
    mapData.forEach((regionData) => setColours({
      ...colours,
       [regionData.name] : calcColour(regionData)}))
  },[mapData,colourCode])
  return (
  
      
   
    <ComposableMap style={{width: "100%", height: "100vh", backgroundColor: "white"}}  projectionConfig = {{center:[-2, 55.4],rotation:[4.4,0,0],parallels:[50,60],scale: 3000}}>
      <ZoomableGroup zoom={1}>
    <Geographies geography={datum}>
    
      {
       ({ geographies }) => {
        geographies
        .forEach((geo,index) => {
            return(
              <>
              <Region geo = {geo} colour = {colours[geo.properties.name]}></Region>
              <Geography  name = {geo.properties.name} fill={(index < 20) ? "#FF0000" : "#ffffff"} stroke='black' key={index} geography={geo} />
              </>
                )
            
          }
        
         
        
      )
      
        }
        
      }
      
    </Geographies>
    </ZoomableGroup>
  </ComposableMap>
    
        
  );
}

export default Map;
