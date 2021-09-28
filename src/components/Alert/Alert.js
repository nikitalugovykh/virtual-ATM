import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { showAlert, showInfo } from '../../redux/actionCreator';
import CashItem from '../CashItem/CashItem';

const AlertWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #bdf4ff;
    position: relative;
    display: fixed;
` 
const AlertMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
`
const H2 = styled.div`
    text-align: center;
    font-size: 30px;
    user-select: none;
`
const CloseBtn = styled.div`
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    opacity: 0.3;  
    &:hover {
        opacity: 1;
    }
    &::before, &::after{
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 2px;
        background-color: #333; 
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
}
`
const Cash = styled.div`
    font-size:20px;
    margin-top: 10px;
    text-align: center;
`



const Alert = (props) => {
    
    const checkCount = (bankNote) => {
        let count  = 0
        Object.entries(props.limits).forEach(item => {
            if (Number(item[0]) === bankNote) {
                count = `${item[1].countBanknotes}____ Total: ${item[1].sum}`
            }
        })
        return count
    }
    
    return (
        <AlertWrapper>
            <AlertMain>
                <H2>{props.alertText}</H2>
                {props.showInfoSwitcher 
                    ? <Cash>
                        {[5000,2000,1000,500,200,100,50].map((item,i) => {
                            return <CashItem 
                                    key = {i} 
                                    item = {item} 
                                    count = {checkCount(item)} 
                        />
                        })}
                    </Cash> 
                    : ''     
                }
                <CloseBtn onClick = {()=> {
                    props.showAlert();

                    if (props.showInfoSwitcher) {
                        props.showInfo()
                    }

                }}/>
            </AlertMain>
        </AlertWrapper>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: () => dispatch(showAlert()),
        showInfo: () => dispatch(showInfo())
    }
}
const mapStateToProps = (state) => {
    console.log(state.showInfo)
    return {
        alertText: state.showAlert.text,
        showInfoSwitcher: state.showInfo,
        limits: state.limits,
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)