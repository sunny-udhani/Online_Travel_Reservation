import React, {Component} from 'react';
import {Route, withRouter, Switch, Link} from 'react-router-dom';
import Background from "../../img/main_slide_1.jpg"

class SwipeImageBackground extends Component {


    render() {
        const divStyle = {
            backgroundImage: 'url(' + Background + ')',
        };
        return (
            <div className="container-fluid">
                <div className="swiper-container main-slider" data-autoplay="5000" data-loop="1" data-speed="900"
                     data-center="0"
                     data-slides-per-view="1">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide active" data-val="0">
                            <div className="clip">
                                <div className="bg bg-bg-chrome act"
                                     style={{backgroundImage: "url(" + Background + ")"}}/>
                            </div>
                            <div className="vertical-align">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title vert-title">
                                                <div className="top-weather-info delay-1">
                                                    <p>London</p>
                                                    <img src="../../img/weather_icon.png" alt=""/>
                                                    <span>+30&deg;C</span>
                                                </div>
                                                <h1 className="color-white delay-1">amazing santorini <br/> 7 days tour
                                                </h1>
                                                <p className="color-white-op delay-2">Book a holiday to santorini.</p>
                                                <button className="c-button bg-aqua hv-transparent delay-2"><img
                                                    src="../../img/loc_icon.png" alt=""/><span>view our tours</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide" data-val="1">
                            <div className="clip">
                                <div className="bg bg-bg-chrome act"
                                     style={{backgroundImage: "url(" + Background + ")"}}>
                                </div>
                            </div>
                            <div className="vertical-align">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title vert-title">
                                                <div className="top-weather-info delay-1">
                                                    <p>London</p>
                                                    <img src="../../img/weather_icon.png" alt=""/>
                                                    <span>+30&deg;C</span>
                                                </div>
                                                <h1 className="color-white delay-1">amazing santorini<br/> 7 days tour
                                                </h1>
                                                <p className="color-white-op delay-2">Curabitur nunc erat, consequat in
                                                    erat ut,
                                                    congue
                                                    bibendum nulla. Suspendisse id pharetra lacus, et hendrerit mi quis
                                                    leo
                                                    elementum.</p>
                                                <a href="#" className="c-button bg-aqua delay-2"><img
                                                    src="../../img/loc_icon.png"
                                                    alt=""/><span>view our tours</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pagination poin-style-1 hidden"></div>
                </div>
            </div>
        );
    }
}

export default withRouter(SwipeImageBackground);