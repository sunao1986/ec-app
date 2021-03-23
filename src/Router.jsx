import React from 'react';
import { Route, Switch } from 'react-router';
import { Signin, Home, Signup, Reset, ProductEdit } from "./templates";
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signin/reset" component={Reset} />

            <Auth>
                <Route exact path="(/)?" component={Home} />
                <Route exact path="(/product/edit)" component={ProductEdit} />
            </Auth>
        </Switch>
    );
}

export default Router;