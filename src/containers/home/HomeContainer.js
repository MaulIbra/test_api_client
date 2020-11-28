import React from 'react';
import image from '../../assets/admin_icon.svg'
import {Container} from "react-bootstrap";

const HomeContainer = () => {
    return (
        <Container className="container-home">
            <div className="container-image">
                <img className="image-home" src={image} alt=""/>
            </div>
            <div className="container-text">
                <h2>Selamat Datang Di Website Pengelolaan data</h2>
            </div>
        </Container>
    );
};

export default HomeContainer;