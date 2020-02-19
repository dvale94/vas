import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccessDenied from './AccessDenied'

const AdminRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
        auth.isAuthenticated === true ? (
            auth.role === 'Admin' ? <Component {...props} /> : <AccessDenied/>
        ) : (
            <Redirect to="/" />
        )
        }
    />
);

AdminRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);