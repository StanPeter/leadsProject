import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './Layout/Header';
import Dashboard from './Leads/Dashboard';
import Alerts from './Layout/Alerts';
import { Provider } from 'react-redux';
import store from '../store';
import Login from './Accounts/Login';
import Register from './Accounts/Register';
import PrivateRoute from './Common/PrivateRoute';
import { loadUser } from '../actions/auth';

//alert options
const alertOptions = {
    timeout: 3000,
    position: "top center",
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider
                    template={AlertTemplate}
                    {...alertOptions} >
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <PrivateRoute exact path='/' component={Dashboard} />
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/register' component={Register} />
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
