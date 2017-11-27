import React, {Component} from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom';
import Kayak from "./components/Kayak";
import Home from "./components/user/Home";


class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Kayak/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
