import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import signIn from "../images/sign_in.png";
import signInTitle from "../images/signin_title.png";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.history.push("/home");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="width-100">
                <div className="sign-container row">
                    <div className="col-md-6 padding-0 background-gray">
                        <img className="width-570 float-r height-100" src={signIn} alt="Logo" />
                    </div>
                    <div className="col-md-6 padding-0">
                        <div className="card card-container">
                            <img className="width-100 margin-auto" src={signInTitle} alt="Logo" />

                            <Form
                                onSubmit={this.handleLogin}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                <div className="form-group">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        placeholder="Name"
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        placeholder="Password"
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <a>Forgot password?</a>
                                </div>

                                <div className="form-group mt-7rem">
                                    <button
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.loading}
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Sign in</span>
                                    </button>
                                </div>
                                <div className="form-group">
                                    <a href="/register" className="signin-wrapper">Don't have an account? Sign up</a>
                                </div>

                                {this.state.message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}