import React, {Component} from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom';
import NewerHomePage from "./components/NewerHomePage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <NewerHomePage/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
