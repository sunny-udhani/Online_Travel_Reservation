import React, {Component} from 'react';
import Slider from 'rc-slider';
import {connect} from "react-redux"
import {hotelList_Success} from "../../actions";
import 'rc-slider/assets/index.css';
import {filter_change} from "../../actions/index";
import * as LogAPI from "../../api/user/API_Logging";

// import "../../css/bootstrap.min.css"
// import "../../css/font-awesome.min.css"
// import "../../css/style1.css"
// import "../../css/jquery-ui.min.css"
// import "../../css/jquery-ui.structure.min.css"

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('../../img', false, /\.(png|jpe?g|svg)$/));

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class FlightListing extends Component {

    filterCriteria = {
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let click = {
            // userId: "anonymous",
            pageName: "FlightListing",
            timeStamp: new Date().toLocaleTimeString()
        };
        console.log(click);
        LogAPI.logClicksPerPage(click)
            .then(res => {
                console.log(`Logged ${click} status: ${res.status}`);
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(FlightListing);