import React from 'react';
import FadeIn from 'react-fade-in';
import '../dashboard.css';
import RadialChart from './RadialChart';
import NumberedList from './NumberedList';
import TwitterLogoList from '../Components/TwitterLogoList';

export default function Dashboard(props) {
    const data = props.data;
    // const arr1 = data.happiestCitiesList;
    // const arr2 = data.topHashtagsList;
    // const arr3 = data.topEmotionsList;

    // const happiestCitiesList = arr1.map((cities, index) => {
    //     return <NumberedList key={"happiestCitiesList"+index} number={(index+1)+"."} message={cities}/>
    // });
    // const topHashtagsList = arr2.map((hashtags, index) => {
    //     return <TwitterLogoList key={"topHashtagsList"+index} message={hashtags}/>
    // });
    
    const clamp = (num) => Math.min(Math.max(num, 0), 100);

    const valuesList = [Math.round(data.fear), Math.round(data.confident),Math.round(data.anger),Math.round(data.joy),Math.round(data.sadness)]
    valuesList.forEach((e, index) => valuesList[index] = clamp(e));
  
    // const topEmotionsList = arr1.map((emotions, index) => {
    //     return <NumberedList key={"topHashtagsList"+index} number={(index+1)+"."} message={emotions}/>
    // });

    return (
        <div className="outer_container">
          <div className="big_container">
            <div className="grid">
              
              <div className="UK_statistics_title">
                UK Statistics
              </div>
              <div className="line1"></div>

              <div className="happiest_cities">
                <div className="section_title">Happiest Cities:</div>
                <FadeIn delay={200}>
                {/* {happiestCitiesList} */}
                  <NumberedList key={"happiestCitiesList"+1} number={"1."} message={data.happiest1}/>
                  <NumberedList key={"happiestCitiesList"+2} number={"2."} message={data.happiest2}/>
                  <NumberedList key={"happiestCitiesList"+3} number={"3."} message={data.happiest3}/>
                  <NumberedList key={"happiestCitiesList"+4} number={"4."} message={data.happiest4}/>
                  <NumberedList key={"happiestCitiesList"+5} number={"5."} message={data.happiest5}/>
                </FadeIn>
              </div>
              
              <div className="top_hashtags">
                <div className="section_title">Top Hashtags:</div>
                <FadeIn delay={200}>
                {/* {topHashtagsList} */}
                  <TwitterLogoList key={"topHashtagsList"+1} message={data.hash1}/>
                  <TwitterLogoList key={"topHashtagsList"+2} message={data.hash2}/>
                  <TwitterLogoList key={"topHashtagsList"+3} message={data.hash3}/>
                  <TwitterLogoList key={"topHashtagsList"+4} message={data.hash4}/>
                  <TwitterLogoList key={"topHashtagsList"+5} message={data.hash5}/>
                </FadeIn>
              </div>
              
              <div className="top_emotions">
                <div className="section_title">Top Emotions:</div>
                <FadeIn delay={200}>
                {/* {topEmotionsList} */}
                  <NumberedList key={"topHashtagsList"+1} number={"1."} message={"Fear - " + valuesList[0] + "%"}/>
                  <NumberedList key={"topHashtagsList"+2} number={"2."} message={"Confident - " + valuesList[1] + "%"}/>
                  <NumberedList key={"topHashtagsList"+3} number={"3."} message={"Anger - " + valuesList[2] + "%"}/>
                  <NumberedList key={"topHashtagsList"+4} number={"4."} message={"Joy - " + valuesList[3] + "%"}/>
                  <NumberedList key={"topHashtagsList"+5} number={"5."} message={"Sadness - " + valuesList[4] + "%"}/>
                </FadeIn>
              </div>
              
              <div className="dial_diagram">
                  <RadialChart values={valuesList}/>
              </div>
            </div>

          </div>
        </div>
    )
}
