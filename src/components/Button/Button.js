import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addAmount, addAmountNumPad, cleanAmount, requiredTotalAmount, showInfo } from '../../redux/actionCreator';

const ButtonNum = styled.button`
    grid-area: num_${(props) => props.info};
    width: 200px;
    height: 50px;
    user-select: none;
    justify-self: center; 
    cursor: pointer;
    background-color: ${({color}) => color || 'none'};
`

const Button = (props) =>{

    const clickHandler = (ev) => {
        if (ev.target.textContent === 'Выдать') {
            props.submitRequiredTotalAmount(props.validInput);
            props.clean()
            return
        }
        if (ev.target.textContent === 'Справка') {
            props.showInfo()
            return
        }
    }

    return (
        <ButtonNum {...props} onClick = { clickHandler }>
            <b>{props.info}</b>
        </ButtonNum>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        addNumber: (num) => dispatch(addAmountNumPad(num)),
        clean: () => dispatch(cleanAmount()),
        submitRequiredTotalAmount: (total) => dispatch(requiredTotalAmount(total)),
        showInfo: () => dispatch(showInfo())
    }
}

const mapStateToProps = (state) => {
    return {
        validInput: state.validInput
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);