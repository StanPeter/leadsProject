import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRouter = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={prosp => {
                if (auth.isLoading) return <h2>Loading...</h2>;
                else if (!auth.isAuthenticated) return <Redirect to="/login" />;
                return <Component {...prosp} />;
            }}
        />
    );
};

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRouter);