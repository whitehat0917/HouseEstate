import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import dashboard from "../images/dashboard.png"
import dashboardWhite from "../images/dashboard_white.png"
import house from "../images/house.png"
import houseWhite from "../images/house_white.png"
import message from "../images/message.png"
import messageWhite from "../images/message_white.png"
import contract from "../images/contract.png"
import contractWhite from "../images/contract_white.png"
import setting from "../images/setting.png"
import settingWhite from "../images/setting_white.png"
import { setMenu } from '../store/actions'
import { Redirect } from "react-router-dom"
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            url: null
        }
        this.selectMenu = this.selectMenu.bind(this);
    }

    selectMenu(id) {
        console.log(id);
        this.props.dispatch(setMenu(id));
        this.setState({ redirect: "/users" });
    }

    render() {
        console.log(this.props.menuId);
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="sidebar-container">
                <div className="menu-item mb-70">
                    <div className="blue-circle"></div>
                    <p>Company</p>
                </div>
                <Nav.Link href="/home" className={this.props.menuId == 1 ? "menu-item active" : "menu-item"}>
                    {this.props.menuId == 1 ? (
                        <img src={dashboardWhite} alt="Dashboard" />
                    ) : (
                            <img src={dashboard} alt="Dashboard" />
                        )}
                    <p>Dashboard</p>
                </Nav.Link>
                <Nav.Link href="/users" className={this.props.menuId == 2 ? "menu-item active" : "menu-item"}>
                    {this.props.menuId == 2 ? (
                        <img src={houseWhite} alt="Houses" />
                    ) : (
                            <img src={house} alt="Houses" />
                        )}
                    <p>Houses</p>
                </Nav.Link>
                <Nav.Link href="/availableIpList" className={this.props.menuId == 3 ? "menu-item active" : "menu-item"}>
                    {this.props.menuId == 3 ? (
                        <img src={messageWhite} alt="Messages" />
                    ) : (
                            <img src={message} alt="Messages" />
                        )}
                    <p>Messages</p>
                </Nav.Link>
                <Nav.Link href="/availableIpList" className={this.props.menuId == 4 ? "menu-item active" : "menu-item"}>
                    {this.props.menuId == 4 ? (
                        <img src={contractWhite} alt="Contracts" />
                    ) : (
                            <img src={contract} alt="Contracts" />
                        )}
                    <p>Contracts</p>
                </Nav.Link>
                <Nav.Link href="/availableIpList" className={this.props.menuId == 5 ? "menu-item setting-active mt-6rem" : "menu-item mt-6rem"}>
                    {this.props.menuId == 5 ? (
                        <img src={settingWhite} alt="Settings" />
                    ) : (
                            <img src={setting} alt="Settings" />
                        )}
                    <p>Settings</p>
                </Nav.Link>
            </div >
        )
    }
}

const mapStateToProps = (state) => state.admin;

export default connect(mapStateToProps)(Sidebar);