import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import signUp from "../images/sign_up.png";
import signUpTitle from "../images/signup_title.png";

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

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="width-100">
                <div className="sign-container row">
                    <div className="col-md-6 padding-0 background-gray">
                        <img className="width-570 float-r height-100" src={signUp} alt="Logo" />
                    </div>
                    <div className="col-md-6 padding-0">
                        <div className="card card-container">
                            <img className="width-100 margin-auto" src={signUpTitle} alt="Logo" />
                            <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                    this.form = c;
                                }}
                            >
                                {!this.state.successful && (
                                    <div>
                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.onChangeUsername}
                                                placeholder="Name"
                                                validations={[required, vusername]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChangeEmail}
                                                placeholder="Email"
                                                validations={[required, email]}
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
                                                validations={[required, vpassword]}
                                            />
                                        </div>

                                        <div className="form-group mt-7rem">
                                            <button className="btn btn-primary btn-block">Sign Up</button>
                                        </div>
                                        <div className="form-group">
                                            <a href="/login" className="signup-wrapper">Already have an account? Sign in</a>
                                        </div>
                                    </div>
                                )}

                                {this.state.message && (
                                    <div className="form-group">
                                        <div
                                            className={
                                                this.state.successful
                                                    ? "alert alert-success"
                                                    : "alert alert-danger"
                                            }
                                            role="alert"
                                        >
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