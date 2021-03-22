import React, { Component } from 'react'
import FadeIn from 'react-fade-in';
import TwitterLogoList from './TwitterLogoList';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../regionalDashboard.css';
import '../dashboard.css';

import fear_emoji from "../images/1F631.svg";
import confident_emoji from "../images/1F60E.svg";
import anger_emoji from "../images/1F624.svg";
import joy_emoji from "../images/1F604.svg";
import sadness_emoji from "../images/1F622.svg";


export default class RegionalDashboard extends Component {
    
    render() {
        let {data} = this.props;
        // prevent crashing if data hasn't been loaded in
        if(!data){
            data = {
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
              }
        }
        const check = () =>{
            const arr = [];
            arr[0] = data.fear;
            arr[1] = data.confident;
            arr[2] = data.anger;
            arr[3] = data.joy;
            arr[4] = data.sadness;

            const indexOfMaxValue = arr.indexOf(Math.max(...arr));
            var return_img = undefined;

            switch(indexOfMaxValue){
                case 0:
                    return_img = fear_emoji;
                    break;
                case 1:
                    return_img = confident_emoji;
                    break;
                case 2:
                    return_img = anger_emoji;
                    break;
                case 3:
                    return_img = joy_emoji;
                    break;
                default:
                    return_img = sadness_emoji;
            }
            return return_img;
        }

        return (
            <div className="float_right">
                <div className="regional_container">
                    <div>
                        <div className="region-title">
                            {data.name}
                        </div>
                        <div className="emoji-div">
                            <img alt="regional dashboard emoji" src={check()} width="56px" height="56px"/>
                        </div>
                        <div className="line"></div>

                        <div className="regional-top-hashtags">
                            <div className="section_title">
                                Top Trends
                            </div>
                            <FadeIn>
                            {/* {top3HashtagsList} */}
                            <TwitterLogoList message={data.trend1} long={true}/>
                            <TwitterLogoList message={data.trend2} long={true}/>
                            <TwitterLogoList message={data.trend3} long={true}/>
                            </FadeIn>
                        </div>

                        <div className="emotional-breakdown">
                            <div className="section_title">
                                Emotional Breakdown
                            </div>
                            <div className="progress_bar_container">
                                <ProgressBar animated now={data.fear} label={Math.round(data.fear)+"%"} className="red-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px"}}/>
                                <ProgressBar animated now={data.confident} label={Math.round(data.confident)+"%"} className="green-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px"}}/>
                                <ProgressBar animated now={data.anger} label={Math.round(data.anger)+"%"} className="purple-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px" }}/>
                                <ProgressBar animated now={data.joy} label={Math.round(data.joy)+"%"} className="orange-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px" , "borderRadius": "19.5px"}}/>
                                <ProgressBar animated now={data.sadness} label={Math.round(data.sadness)+"%"} className="blue-progress-bar" height="1px" style={{ height: "30.82px", margin:"10px 0px 10px 0px", "borderRadius": "19.5px" }}/>
                            </div>
                        </div>
                        <div className="sample-size">
                            Sample size: {data.sample_size}
                        </div>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
