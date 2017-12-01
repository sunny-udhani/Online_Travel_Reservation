import React, {Component} from 'react';
import '../styles/progressbar.css';

export default class Progressbar extends Component {
    constructor() {
        super();
    }

    render() {
        let progressStyle = {
            backgroundColor: this.props.color || 'black',
            width: this.props.progress + '%' || '50%'
        };

        let progressbarStyle= {
            height: this.props.height || '20px'
        }
        return (
            <div className='progressbar' style={progressbarStyle}>
                <div className="label-section">
                    <label  className="label1">{this.props.label1 || "label1"}</label>
                    <label className="label2">{this.props.label2 || "label2"}</label>
                </div>
                <div className="progress-div" style={progressStyle}></div>
            </div>
        )
    }
};