import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const NumPadWrapper = styled.div`
margin-top: 10px;
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr 1fr; 
  gap: 12px 12px; 
  grid-template-areas: 
    "num_1 num_2 num_3"
    "num_4 num_5 num_6"
    "num_7 num_8 num_9"
    "empty_1 num_0 empty_2"; 

`
const Buttons = () => {
    return (
        <NumPadWrapper>
            {
                [0,1,2,3,4,5,6,7,8,9].map((num, index) => {
                    return <Button key = {index} info = {num}/>
                }) 
            }
        </NumPadWrapper>
        
    )      
        

}

export default Buttons;