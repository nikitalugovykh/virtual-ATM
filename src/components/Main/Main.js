import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Buttons from '../Buttons/Buttons';
import ColumnSection from '../ColumnSection/ColumnSection';
import CheckboxBankNote from '../CheckboxBankNote/CheckboxBankNote';
import CashItem from '../CashItem/CashItem';
import { addAmount, cleanAmount, cleanSelectNote, givenMoney, requiredTotalAmount, showAlert, updateBalance } from '../../redux/actionCreator';
import { getMoneyATM, getMoneyATMWithChosenNotes } from '../../logic';
import Alert from '../Alert/Alert';

const MainWrapper = styled.section`
    flex: 1 0 auto;
    background-color: #a4b9bd4f;
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
` 
const FormRequired = styled.form`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`
const InputNum = styled.input`
    width: 300px;
    height: 50px;
    border: none;
    padding-left: 10px;
    outline:transparent;
    border-top-left-radius:5px;
    border-bottom-left-radius:5px;
    font-size:20px
    
`
const Button = styled.button`
    width: 70px;
    height: 50px;
    border: none;
    cursor: pointer;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
    background-color: #ff9999;
    &:hover{
        background-color: #cccccc;
    }
`
const Title = styled.h2`
    font-size: 35px;
    text-align:center;
`
const SubTitle = styled.span`
    font-size: 15px;
    text-align:center;
`
const FormForDifferentVariansNotes = styled.form`
    display: flex;
    flex-direction: column;
`
const Legend = styled.legend`
    text-align:center;
    font-size:20px;
    margin-bottom:10px;
`
const Cash = styled.div`
    font-size:20px;
    margin-top: 10px;
    text-align: center;
`
const Balance = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    font-size:20px;
`

const Main = (props) => {

    const updateNumberHandler = (ev) => {
        ev.preventDefault();
        const val = ev.target.value
    
        if (ev.target.validity.valid) {
            props.addNumber(val)
        }

    }

    const cleanInputHandler = (ev) => {
        ev.preventDefault();
        props.clean()
        ev.target.previousElementSibling.focus()
    }
    const submitHandler = (ev) => {
        ev.preventDefault()
        if (props.getBalance < 50) {
            props.showAlert('Деньги закончились')
            props.clean() 
        }
        if(props.validAmountRequired > props.getBalance) {
            props.showAlert('Введенная вами сумма превышает размеры этого виртуального кошелька')
            return
        }
        if (props.validAmountRequired % 50 === 0) {
            let moneyForUser
            if(props.selectedNotes.length !== 0) {
                let permission = false
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
               


            } else {
                moneyForUser = getMoneyATM(props.validAmountRequired, props.limits);
            }
            props.submitRequiredTotalAmount(props.validAmountRequired)
            props.updateGivenMoney(moneyForUser)
            
            props.updateBalance(Object.values(props.limits).reduce((acc, curr) => Number(acc) + Number(curr.sum),0))
            props.clean()
        } else {
            ev.target.firstElementChild.focus()
            props.showAlert('Введите сумму кратную 50')
            props.clean() 
        }

    }
    
    const checkCount = (bankNote) => {
        if(props.getBalance <= 50) return
        let count  = 0
        Object.entries(props.givenMoney).forEach(item => {
            if (Number(item[0]) === bankNote) {
                count = item[1]
            }
        })
        return count
    }

    props.updateBalance(Object.values(props.limits).reduce((acc, curr) => Number(acc) + Number(curr.sum),0))

    return (
        <MainWrapper>
            {props.alertPermission
                ? <Alert/>
                : (<Row>
                <ColumnSection>
                    <Title>Введите сумму</Title>
                    <SubTitle>Какую сумму хотите снять?</SubTitle>
                    <FormRequired onSubmit={submitHandler}>
                        <InputNum 
                            type='text' 
                            placeholder='Введите сумму' 
                            pattern='[0-9]*'
                            value = {props.validAmountRequired}
                            onChange = {updateNumberHandler}
                        />
                        <Button
                            onClick={cleanInputHandler}
                            type='button'
                        >
                            Стереть
                        </Button>
                    </FormRequired>
                    <Buttons/>
                </ColumnSection>
                <ColumnSection>
                    <FormForDifferentVariansNotes>
                        <Legend>Выберете <br/> купюры</Legend>
                        {[5000,2000,1000,500,200,100,50].map((note, i)=> {
                            return <CheckboxBankNote 
                                            key = {i} 
                                            num = {i} 
                                            note = {note}/>
                        })}
                    </FormForDifferentVariansNotes>
                </ColumnSection>
                <ColumnSection>
                    <Title>Выдано пользователю</Title>
                    <Cash>
                        {[5000,2000,1000,500,200,100,50].map((item,i) => {
                            return <CashItem 
                                        key = {i} 
                                        item = {item} 
                                        count = {checkCount(item)}/>
                        })}
                    </Cash>
                    <Balance>Остаток:<span><b>{props.getBalance}</b></span></Balance>
                </ColumnSection>
            </Row>)
            }
        </MainWrapper>

    )
}

const mapStateToProps = (state) => {
    return {
        validAmountRequired: state.validInput,
        showInfo: state.showInfo,
        limits: state.limits,
        alertPermission: state.showAlert.state,
        givenMoney: state.givenMoney,
        getBalance: state.balance,
        selectedNotes: state.selectedNotes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNumber: (num) => dispatch(addAmount(num)),
        clean: () => dispatch(cleanAmount()),
        submitRequiredTotalAmount: (total) => dispatch(requiredTotalAmount(total)),
        updateGivenMoney: (data) => dispatch(givenMoney(data)),
        showAlert: (text) => dispatch(showAlert(text)),
        updateBalance: (total) => dispatch(updateBalance(total)),
        cleanSelectedNote: () => dispatch(cleanSelectNote())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

