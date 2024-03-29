import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "./App.css";
import "./css/pe-icon-7-stroke.css";
import "./sass/index.scss";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import AvailableIpList from "./components/AvailableIpList.component";
import ProxyHistory from "./components/ProxyHistory.component";
import UsedProxy from "./components/UsedProxy.component";
import UserList from "./components/UserList.component";
import UserProxy from "./components/UserProxy.component";
import BlackList from "./components/BlackList.component";
import Sidebar from "./components/Sidebar.component";
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAgentBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                // showAgentBoard: user.roles.includes("2"),
                // showAdminBoard: user.roles.includes("1")
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router>
                <div>
                    {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/home">HOME</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto ml-auto">
                                <Nav.Link href="/availableIpList" className="px-3">Available IP</Nav.Link>
                                <Nav.Link href="/usedProxy" className="px-3">Used Proxy</Nav.Link>
                                <Nav.Link href="/proxyHistory" className="px-3">Proxy History</Nav.Link>
                                <Nav.Link href="/users" className="px-3">Users</Nav.Link>
                                <Nav.Link href="/blacklist" className="px-3">Blacklist</Nav.Link>
                            </Nav>
                            {currentUser ? (
                                <div>
                                    <Nav>
                                        <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                                        <Nav.Link href="/login" onClick={this.logOut}>LogOut</Nav.Link>
                                    </Nav>
                                </div>
                            ) : (
                                    <div>
                                        <Nav>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                            <Nav.Link href="/register">Sign Up</Nav.Link>
                                        </Nav>
                                    </div>
                                )}
                        </Navbar.Collapse>
                    </Navbar> */}
                    <div className="menu-container">
                        {currentUser ? (
                            <Sidebar />
                        ) : (<div></div>)}
                        <Switch>
                            <PrivateRoute path="/home/" component={Home} />
                            {/* <Route exact path="/home" component={Home} /> */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <PrivateRoute path="/profile" component={Profile} />
                            <PrivateRoute path="/availableIpList" component={AvailableIpList} />
                            <PrivateRoute path="/proxyHistory" component={ProxyHistory} />
                            <PrivateRoute path="/usedProxy" component={UsedProxy} />
                            <PrivateRoute path="/users" component={UserList} />
                            <PrivateRoute path="/blacklist" component={BlackList} />
                            <PrivateRoute path="/userProxy/:id" component={UserProxy} />
                            <PrivateRoute path="/" component={Home} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;