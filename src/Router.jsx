import React from 'react';
import { Route, Switch } from 'react-router';
import { Signin, ProductList, Signup, Reset, ProductEdit, ProductDetail } from "./templates";
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={Signup} />
            <Route exact path={"/signin"} component={Signin} />
            <Route exact path={"/signin/reset"} component={Reset} />

            <Auth>
                <Route exact path={"(/)?"} component={ProductList} />
                <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
                <Route exact path={"/product/:id"} component={ProductDetail} />
            </Auth>
        </Switch>
    );
}

export default Router;