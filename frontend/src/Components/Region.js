import React, {useState} from "react";
import "../index.css";
import { Geography } from "react-simple-maps";

function Region(props) {
    const [strokeColour, setStrokeColour] = useState('black')
    const [strokeWidth, setStrokeWidth] = useState('3px')
    let {setCurrentRegion, colour,geo, geo : {properties : {name}, rsmKey}} = props
    
    function handleClick(){
        setCurrentRegion(name)
        setStrokeWidth('6px')
    }
    function handleHover(){
        setStrokeColour('#00AEEF')
    }
    function handleNoHover(){
        setStrokeColour('black')
    }

    return (
        <Geography onClick = {() => handleClick()} onMouseEnter = {() => handleHover()} onMouseLeave = {() => handleNoHover()} fill={colour} strokeWidth={strokeWidth} stroke={strokeColour} key={rsmKey} geography={geo} />
    )
    
};
  
export default Region;
  