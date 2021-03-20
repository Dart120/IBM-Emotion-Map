import React, {useState,useEffect} from "react";
import "../index.css";
import { Geography } from "react-simple-maps";

function Region(props) {
    const [strokeColour, setStrokeColour] = useState('black')
    const [strokeWidth, setStrokeWidth] = useState('3px')
    let {setCurrentRegion, colour,geo, geo : {properties : {name}, rsmKey}} = props
    useEffect(() => {
        if (props.clicked === rsmKey){
            setStrokeWidth('6px')

        }else{
            setStrokeWidth('3px')
        }
    }, [props.clicked]);
    function handleClick(){
        props.setClicked(rsmKey)
        setCurrentRegion(name)
        
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
  