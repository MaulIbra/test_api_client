import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import Swal from "sweetalert2";
import loginIcon from "../../assets/login.svg"
import {LoadingComponent} from "../../component/LoadingComponent";
import {login, register} from "../../api/AuthService";

const AuthForm = (props) => {

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        error: "",
    })
    const [view, setView] = useState("login")

    const handleChangeInput = (name, val) => {
        setUserInput({
            ...userInput,
            [name]: val
        })
    }

    const validationForm = () => {
        return (userInput.email !== "" && userInput.password !== "" && validationEmail(userInput.email) === true)
    }

    const validationEmail = (email) => {
        // eslint-disable-next-line
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(String(email).toLowerCase());
    }

    const handleLogin = () => {
        let account = {
            email: userInput.email,
            password: userInput.password
        }
        LoadingComponent()
        Swal.showLoading()
        login(account).then((result) => {
            if (result.data.statusCode === 200) {
                Swal.close()
                setUserInput({
                    ...userInput,
                    error: ""
                })
                sessionStorage.setItem('token', result.data.payload.token)
                props.onLogin()
            }
        }).catch((err) => {
            if (err.response.data.statusCode === 401) {
                Swal.close()
                setUserInput({
                    ...userInput,
                    error: err.response.data.message
                })
            } else {
                Swal.close()
            }
        })
    }

    const handleRegister = () => {
        let account = {
            email: userInput.email,
            password: userInput.password
        }
        LoadingComponent()
        Swal.showLoading()
        register(account).then((result) => {
            if (result.data.statusCode === 201) {
                Swal.close()
                setUserInput({
                    ...userInput,
                    error: ""
                })
                sessionStorage.setItem('token', result.data.payload.token)
                props.onLogin()
            }
        }).catch((err) => {
            if (err.response.data.statusCode === 401) {
                Swal.close()
                setUserInput({
                    ...userInput,
                    error: err.response.data.message
                })
            } else {
                Swal.close()
            }
        })
    }

    return (
        <Card className="shadow-lg bg-white rounded-sm card-style">
            <div className="header-card">
                <img src={loginIcon} alt=""/>
                Login Page
            </div>
            <Card.Body className="p-4">
                <Form>
                    <InputComponent
                        inputType={"email"}
                        inputName={"email"}
                        inputLabel={"Email"}
                        inputPlaceholder={"Enter Email"}
                        value={userInput.email}
                        onChange={e => {
                            handleChangeInput("email", e.target.value)
                        }}
                        isValidEmail={validationEmail(userInput.email)}
                        currentState={userInput.email}
                    />
                    <InputComponent
                        inputType={"password"}
                        inputName={"password"}
                        inputLabel={"Password"}
                        value={userInput.password}
                        inputPlaceholder={"Enter password"}
                        onChange={e => {
                            handleChangeInput("password", e.target.value)
                        }}
                    />
                    <div className="container-error">
                        <small className="text-danger">{userInput.error === undefined ? "" : userInput.error}</small>
                    </div>

                    {
                        view === "login" ?
                            <div className="container-button mt-4">
                                <ButtonComponent btnLabel={"Login"} validation={validationForm()} click={() => handleLogin()}/>
                            </div>
                            :
                            <div className="container-button mt-4">
                                <ButtonComponent btnLabel={"register"} validation={validationForm()} click={() => handleRegister()}/>
                            </div>
                    }

                    {
                        view === "login" ?
                            <div className="mt-2">
                                <p className="font-weight-normal">Not Registered ? <strong className="text-primary" onClick={
                                    () => {
                                        setView("register")
                                        setUserInput({
                                            ...userInput,
                                            email: "",
                                            password: "",
                                            error: ""
                                        })
                                    }}>Create an account</strong></p>
                            </div>
                        :
                            <div className="mt-2">
                                <p className="font-weight-normal">Already have an account ? <strong className="text-primary" onClick={() => {
                                    setView("login")
                                    setUserInput({
                                        ...userInput,
                                        email: "",
                                        password: "",
                                        error: ""
                                    })
                                }}>Login</strong></p>
                            </div>
                    }

                </Form>
            </Card.Body>
        </Card>
    );
};

export default AuthForm;