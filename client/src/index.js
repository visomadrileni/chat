import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import store from './store/store';
import RoutesContainer from './components/entries/RoutesContainer';
import './styles/index.scss';

const history = createBrowserHistory();
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <RoutesContainer />
        </Router>
    </Provider>,
   document.getElementById('app'))

