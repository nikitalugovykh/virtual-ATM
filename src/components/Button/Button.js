import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getMoneyATM, getMoneyATMWithChosenNotes } from '../../logic';
import { addAmountNumPad, cleanAmount, cleanSelectNote, givenMoney, requiredTotalAmount, showAlert, showInfo, updateBalance } from '../../redux/actionCreator';

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
            let moneyForUser
            if(props.validAmountRequired > props.getBalance) {
                props.showAlert('Введенная вами сумма превышает размеры этого виртуального кошелька')
                return
            }
            if (props.validAmountRequired % 50 !== 0) {
                props.showAlert('Введите сумму кратную 50')
                props.clean()
                return 
            }
            if(props.selectedNotes.length !== 0) {
                let permission = false;
                for (let i = 0; i < props.selectedNotes.length; i++) {
                    if (props.validAmountRequired % props.selectedNotes[i] === 0) {
                        permission = true
                    }
                }
                if (permission) {
                    moneyForUser = getMoneyATMWithChosenNotes(
                        props.validAmountRequired, 
                        props.limits, 
                        props.selectedNotes)

                    props.cleanSelectedNote()
                } else {
                    props.showAlert('Одна из купюр должна быть кратна запрашиваемой сумме')
                    props.cleanSelectedNote()  
                    return
                }
                 
            } else{
                moneyForUser = getMoneyATM(props.validInput, props.limits);
            }
            
            props.submitRequiredTotalAmount(props.validInput);
            props.updateGivenMoney(moneyForUser);
            props.updateBalance(Object.values(props.limits).reduce((acc, curr) => Number(acc) + Number(curr.sum),0))
            if (props.getBalance < 50) {
                props.showAlert('Деньги закончились')
                props.clean() 
                return
            }
            props.clean()
            return
        }
        if (ev.target.textContent === 'Справка') {
            props.showInfo()
            props.showAlert('Осталось купюр')
            return
        }
        props.addNumber(ev.target.textContent)
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
        showInfo: () => dispatch(showInfo()),
        updateGivenMoney: (data) => dispatch(givenMoney(data)),
        updateBalance: (total) => dispatch(updateBalance(total)),
        showAlert: (text) => dispatch(showAlert(text)),
        cleanSelectedNote: () => dispatch(cleanSelectNote())
    }
}

const mapStateToProps = (state) => {
    return {
        validInput: state.validInput,
        limits: state.limits,
        getBalance: state.balance,
        validAmountRequired: state.validInput, 
        selectedNotes: state.selectedNotes       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);