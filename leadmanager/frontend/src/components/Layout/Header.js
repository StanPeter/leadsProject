import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { logout } from '../../actions/auth';

class Header extends Component {
    static proptypes = {
        auth: Proptypes.object.isRequired,
        logout: Proptypes.func.isRequired
    }

    render() {
        const {
            isAuthenticated,
            user
        } = this.props.auth

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <button
                        onClick={this.props.logout}
                        className="nav-link btn btn-info btn-sm text-light">
                        Logout
                    </button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link
                        to="/register"
                        className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/login"
                        className="nav-link">Login</Link>
                </li>
            </ul>
        );

        // console.log(this.props, 'props');

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Lead Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    </ul>
                </div>
                <div className="navbar-collapse collapse">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { logout })(Header);