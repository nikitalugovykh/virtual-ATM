import React from 'react';
import styled from 'styled-components';

const HeaderComponent = styled.header`
    padding: 30px 0 30px;
    background-color: #0dcaf0;
    text-align: center;
    flex: 0 0 auto;
`
const H2 = styled.h2`
    font-size: 30px;
`

const Header = (props) => {
    return (
        <HeaderComponent>
            <H2>Виртуальный банкомат</H2>
        </HeaderComponent>
    )
}

export default Header