import React from 'react';
import {Form} from "react-bootstrap";

const InputComponent = (props) => {

    const {inputType, inputName, inputLabel, disable, inputPlaceholder, onChange, value} = props

    return (
        <Form.Group>
            <Form.Label>{inputLabel}</Form.Label>
            <Form.Control
                name={inputName}
                type={inputType}
                placeholder={inputPlaceholder}
                onChange={onChange}
                value={value}
                disabled={disable}
            />
        </Form.Group>
    );
};

export default InputComponent;