import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import HeaderComponent from "./component/HeaderComponent";
import NotFoundComponent from "./component/NotFoundComponent";
import HomeContainer from "./containers/home/HomeContainer";
import UserContainer from "./containers/user/UserContainer";

const routes = [
    {id: 1, path: '/', component: HomeContainer},
    {id: 2, path: '/user', component: UserContainer},
];


const Routes = () => {

    const routeList = routes.map((route) => {
        return <Route
            exact
            key={route.id}
            path={route.path} render={
            (props) => {
                return <route.component {...props}/>
            }
        }/>
    });

    return (
        <div>
            <HeaderComponent/>
            <Switch>
                {routeList}
                <Route path="*">
                    <NotFoundComponent/>
                </Route>
            </Switch>
        </div>
    );
};

export default withRouter(Routes);