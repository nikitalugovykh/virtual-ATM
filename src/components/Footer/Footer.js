import React from 'react';
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

const Footer = () => {
    return (
        <FooterStyle>
            <Button 
                info = 'Выдать' 
                color = '#489048'
            />
            <Button info = 'Справка'/>
        </FooterStyle>
    )
}
export default Footer