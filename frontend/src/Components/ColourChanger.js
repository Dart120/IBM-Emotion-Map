import React, {useState} from "react";
import "../settings.css";
import {useColour} from './ColourContext'
import SettingsRow from "./SettingsRow"
import {Link} from 'react-router-dom'
function ColourChanger(props){
    let colours = useColour()

    return(
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <div className="colour-changers">
            {
            Object.entries(colours).map(([emotion,colour])=> <SettingsRow key={emotion} colour={colour} emotion = {emotion}/>)
            }
            <div className="done-container">
                <Link  to="/">
                <div className="done-button"><h5 style={{textDecoration: 'none', color: 'white'}}>Done</h5></div>
                </Link>
            </div>
            </div>
            
        </div>
    )
}

export default ColourChanger