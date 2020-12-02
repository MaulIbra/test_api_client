import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import InputComponent from "../../component/InputComponent";
import ButtonComponent from "../../component/ButtonComponent";
import {connect} from "react-redux";

const UserForm = (props) => {

    const {formType, editedData,errorData, show, hide, jobs, education} = props
    const [userInput, setUserInput] = useState({
        idCardNumber: "",
        username: "",
        dateOfBirth: "",
        job: "",
        education: ""
    })

    const validationForm = () => {
        return (userInput.idCardNumber !== "" && userInput.username !== "" && userInput.dateOfBirth !== "" && userInput.job !== "" && userInput.education !== "")
    }

    const handleChangeInput = (name, value) => {
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const reset = () => {
        setUserInput({
            ...userInput,
            idCardNumber: "",
            username: "",
            dateOfBirth: "",
            job: "",
            education: ""
        })
    }

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const handleSubmit = (formType, id) => {
        let user = {
            idCardNumber: userInput.idCardNumber,
            username: userInput.username.toUpperCase(),
            dateOfBirth: userInput.dateOfBirth,
            job: {
                jobId: userInput.job
            },
            education: {
                educationId: userInput.education
            }
        }

        if (formType === "Create") {
            props.create(user)
        } else {
            props.update(id, user)
        }
        reset()
    }

    const prevEditedData = usePrevious({editedData});
    useEffect(() => {
        if (prevEditedData !== editedData && Object.keys(editedData).length !== 0) {
            setUserInput({
                ...userInput,
                idCardNumber: editedData.idCardNumber,
                username: editedData.username,
                dateOfBirth: editedData.dateOfBirth,
                job: editedData.job.jobId,
                education: editedData.education.educationId
            })
        } else {
            reset()
        }
    }, [editedData])

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{formType} User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="form">
                    <InputComponent
                        inputType={"number"}
                        inputName={"setIdCardNumber"}
                        inputLabel={"Nomor KTP"}
                        value={userInput.idCardNumber}
                        disable={formType === "Detail"}
                        inputPlaceholder={"Masukkan Nomor KTP (maximum 16 digit)"}
                        onChange={e => {
                            handleChangeInput("idCardNumber", e.target.value)
                        }}
                    />
                    <div className="container-error">
                        <small className="text-danger">{errorData.errors === undefined ?"":errorData.errors.IdCardNumber === undefined ? "":errorData.errors.IdCardNumber}</small>
                    </div>
                    <InputComponent
                        inputType={"text"}
                        inputName={"setUsername"}
                        inputLabel={"Nama Lengkap"}
                        value={userInput.username}
                        disable={formType === "Detail"}
                        inputPlaceholder={"Masukkan Nama Lengkap"}
                        onChange={e => {
                            handleChangeInput("username", e.target.value)
                        }}
                    />
                    <Form.Group>
                        <Form.Label>Tanggal Lahir</Form.Label>
                        <Form.Control
                            disabled={formType === "Detail"}
                            type="date"
                            value={userInput.dateOfBirth}
                            onChange={e => handleChangeInput("dateOfBirth", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pekerjaan</Form.Label>
                        <Form.Control
                            disabled={formType === "Detail"}
                            as="select" size="md"
                            value={userInput.job}
                            onChange={e => {handleChangeInput("job", e.target.value)}}>
                            <option value="" disabled selected >-- Pilih Pekerjaan --</option>
                                {jobs.map((val) => {
                                    return (<option value={val.jobId} key={val.jobId}>{val.jobLabel}</option>)
                                })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Pendidikan Terakhir</Form.Label>
                        <Form.Control
                            disabled={formType === "Detail"}
                            as="select" size="md"
                            value={userInput.education}
                            onChange={e => {handleChangeInput("education", e.target.value)}}>
                            <option value="" disabled selected >-- Pilih Pendidikan --</option>
                                {education.map((val) => {
                                    return (
                                        <option value={val.educationId} key={val.educationId}>{val.educationLabel}</option>)
                                })}
                        </Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {formType === "Detail" ? "" :
                    <ButtonComponent
                        btnLabel={formType}
                        validation={validationForm()}
                        click={() => handleSubmit(formType, editedData.idUser)}
                    />
                }
                <Button variant="primary" onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        jobs: state.userReducer.user.jobs,
        education: state.userReducer.user.education
    }
}

export default connect(mapStateToProps, null)(UserForm);