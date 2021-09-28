import React from 'react';
import styled from 'styled-components';

const ColumnWrapper = styled.div`
    flex: 1 1 auto;
    margin: 10px;
    padding: 10px;
    border: 1.2px solid #00000042;
    background-color: #e2e2e2a1;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`

const ColumnSection = ({children}) => {
    return ( 
        <ColumnWrapper>
            {children}
        </ColumnWrapper>
     );
}

export default ColumnSection;