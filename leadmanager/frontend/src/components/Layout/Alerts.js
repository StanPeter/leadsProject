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

        // if (error !== prevProps.error) {
        //     if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
        //     if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
        //     if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
        //     if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
        //     if (error.msg.username) alert.error(error.msg.username.join());
        // }

        // if (message !== prevProps.message) {
        //     if (message.deleteLead) alert.success(message.deleteLead);
        //     if (message.addLead) alert.success(message.addLead);
        //     if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        // }
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
