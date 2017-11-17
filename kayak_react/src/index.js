import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux';


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <div className="wrapper container">
        <Provider store={store}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('root'));
