import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store} from "./State/store";
import {Provider} from "react-redux";
import AppWithRedux from "./AppWithRedux";

// ReactDOM.render(<App />,  document.getElementById('root'));

/*ReactDOM.render(<AppWithReducer />,  document.getElementById('root'));
//переходим на redux, используем компоненту Provider */

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>,  document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
