import React, {Component} from 'react';
import Progressbar from './progressbar.jsx';
import '../styles/collapsiblecard.css';

export default class CollapsibleCard extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="collapsible-card">
                <div className="row">

                    <input type="checkbox" id="collapse-toggle"/>

                    <div className="col-md-12 header">
                        <p className="detaildescription">Show Hotel Details</p>    <label htmlFor="collapse-toggle"><span className="glyphicon glyphicon-chevron-down hidden"></span></label>
                        <label htmlFor="collapse-toggle"><span className="glyphicon glyphicon-chevron-up hidden"></span></label>
                    </div>

                    <div className="col-md-12 body">
                        <div className="rowcollap">
                            <p className="reviewdetails">Reviews</p>
                        </div>
                        <Progressbar  height="10px" color="#20bf7c" progress={30/50 * 100} label1="0" label2="10" />
                    </div>
                </div>
            </div>

        );
    }
}

