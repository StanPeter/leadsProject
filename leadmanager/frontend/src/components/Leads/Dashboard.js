import React, { Fragment } from 'react';
import Form from './Form';
import Leads from './Leads';

const Dashboard = (props) => {
    return (
        <Fragment>
            <Form />
            <Leads />
        </Fragment>
    );
};

export default Dashboard;
