import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Alerts extends Component {
    static proptypes = {
        errors: Proptypes.object.isRequired,
        message: Proptypes.object.isRequired,
    }

    componentDidUpdate(prevProps) {
        const {
            error,
            alert,
            message
        } = this.props; //from react-alert package

        if (error !== prevProps.error) {
            if (error.msg) {
                const errorMessages = [];
                for (const name in error.msg) {
                    errorMessages.push(`${name}: ${error.msg[name]}`)
                }

                alert.error(errorMessages[0]);
            }
        }

        if (message !== prevProps.message) alert.success(message.message);
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    error: state.errorsReducer,
    message: state.messagesReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));
