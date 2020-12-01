import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderComponent from "./component/HeaderComponent";
import HomeContainer from "./containers/home/HomeContainer";
import UserContainer from "./containers/user/UserContainer";
import Login from "./containers/login/Login";


const routes = [
    {id: 1, path: '/home', component: HomeContainer},
    {id: 2, path: '/user', component: UserContainer},
];

class Routes extends Component {

    state = {
        auth: false,
        token: sessionStorage.getItem("token")
    };

    onLogin = () => {
        this.setState({
            auth: true
        })
        this.props.history.push({
            pathname: '/home'
        })
    };

    onLogout = () => {
        sessionStorage.clear()
        this.setState({
            auth: false
        })
        this.props.history.push({
            pathname: '/'
        })
    }

    componentDidMount() {
        if (sessionStorage.getItem("token") === null) {
            this.props.history.push({
                pathname: '/'
            })
        } else {
            this.props.history.push({
                pathname: '/home'
            })
        }
    }

    render() {

        const routeList = routes.map((route) => {
            return <Route
                key={route.id}
                path={route.path} render={
                (props) => {
                    return this.state.token !== null || this.state.auth ?
                        <route.component {...props}/> : <Redirect to='/'/>
                }
            }/>
        });

        return (
            <div>
                <HeaderComponent logout={() => this.onLogout()}/>
                <Switch>
                    <Route path="/" exact>
                        <Login onLogin={this.onLogin}/>
                    </Route>
                    {routeList}
                </Switch>
            </div>
        );
    }
}

export default withRouter(Routes);