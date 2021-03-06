import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'; 
import {createStore, combineReducers, compose, applyMiddleware } from 'redux';

import PhotosSearch from './main/reducer'

const rootReducers = combineReducers({
    PhotosSearch: PhotosSearch, 
    //SaveInputValues: SaveInputValues
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
        rootReducers, 
        composeEnhancer(
            //applyMiddleware(thunk)     
        )
    );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
