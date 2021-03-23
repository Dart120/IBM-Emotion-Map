import React, {useState,useEffect,forwardRef} from "react";
import "../index.css";
import { Geography } from "react-simple-maps";
import Tooltip from '@material-ui/core/Tooltip';

const GeogRefs = forwardRef((props,ref) => {
    console.log(props)
    let {handleHover,handleNoHover,handleClick,fill:colour,strokeWidth,stroke:strokeColour,key:rsmKey,geography:geo} = props
   
    return (
        
        
            
                null

           
       
        
       
    )
    
});
  
export default GeogRefs;