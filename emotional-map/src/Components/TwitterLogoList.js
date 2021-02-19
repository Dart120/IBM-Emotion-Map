import React from 'react';
import '../dashboard.css';
import twitterLogo from '../images/twitterLogo.png';

export default function TwitterLogoList(props) {
    return (
            <div className="rectangle">
            <div className="white-circle">
              <div className="twitterLogo">
                  <img src={twitterLogo} alt="TwitterLogo"/>
              </div>
            </div>
            <div className="black_text">{props.message}</div>
          </div>
    )
}

