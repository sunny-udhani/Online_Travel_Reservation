import React, {Component} from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom';
import Kayak from "./components/Kayak";


class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Kayak/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
