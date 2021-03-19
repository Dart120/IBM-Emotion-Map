// DELETE THIS FILE, IT'S JUST AN EXAMPLE TO DEMONSTRATE 
// THE MOUSEOVER FUNCTIONALITY OF THE MAP AND HOW THAT 
// AFFECTS THE REGIONAL DASHBOARD!

import React, { Component } from 'react';

export default class DummyMap extends Component {
    constructor (props) {
        super(props)
        this.hoverHandler = this.hoverHandler.bind(this);
    }

    hoverHandler(region){
        this.props.setCurrentRegion(region)
    }
    

    render() {
        //this.hoverHandler('Manchester');
        
        return (
            <div>
                <p>This is a dummy example to replicate onmouseover of map</p>
                <p onMouseOver={this.hoverHandler.bind(this, 'Manchester')}>Manchester</p>
                <p onMouseOver={this.hoverHandler.bind(this, 'Sheffield')}>Sheffield</p>
                <p onMouseOver={this.hoverHandler.bind(this, 'Leeds')}>Leeds</p>
                <p onMouseOver={this.hoverHandler.bind(this, 'Glasgow')}>Glasgow</p>
                <p onMouseOver={this.hoverHandler.bind(this, 'NonExistingCity')}>NonExistingCity</p>
            </div>
        )
    }
}
