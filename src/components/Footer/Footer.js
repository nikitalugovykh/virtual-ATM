import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../Button/Button';

const  FooterStyle = styled.footer`
    flex: 0 0 auto;
    height: 100px;
    background-color: #0dcaf0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`

const Footer = (props) => {
    return (
        <FooterStyle>
            <Button 
                info = 'Выдать' 
                color = '#489048'
                disabled = {props.showAlert}
            />
            <Button info = 'Справка'  disabled = {props.showAlert}/>
        </FooterStyle>
    )
}

const mapStateToProps = (state) => {
    return {
        showAlert: state.showAlert.state
    }
}

export default connect(mapStateToProps, null)(Footer)