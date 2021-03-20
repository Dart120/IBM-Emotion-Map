import React, {useState, useEffect} from "react";
import "../index.css";
import { ComposableMap, Geographies} from "react-simple-maps";
import datum from '../output1.json'
import Region from './Region'


function Map(props) {
  const [colours,setColours] = useState({})
  const [clicked,setClicked] = useState('')
  const mapData = props.mapData
  const colourCode = props.colourCode
  console.log(props)
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
    <ComposableMap style={{width: "100%", height: "100vh"}}  projectionConfig = {{center:[-2, 55.4],rotation:[4.4,0,0],parallels:[50,60],scale: 3000}}>
    <Geographies geography={datum}>
      {
       ({ geographies }) => 
        geographies
        .map((geo,index) => {
            return(
              <>
              <Region setClicked = {setClicked} clicked = {clicked} setCurrentRegion = {props.setCurrentRegion} geo = {geo} colour = {colours[geo.properties.name]}></Region>
              </>
                )
          }
      )
      }
    </Geographies>
  </ComposableMap>      
  );
}

export default Map;
