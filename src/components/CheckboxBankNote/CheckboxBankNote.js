import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectNote, unselectNote } from '../../redux/actionCreator';

const CheckboxWrapper = styled.div`
    margin-top: 5px;
`
const Input = styled.input`
    margin-right: 5px;
    width: 15px;
    height: 15px;
`
const Label = styled.label`
    font-size: 20px;
    user-select: none;
`

const CheckboxBankNote = ({note, num, updateSelectedNote, removeSelectedNote}) => {

    const checkboxHandler = (ev) => {
        if(ev.target.checked) {
            updateSelectedNote(ev.target.labels[0].innerHTML)
        } else {
            removeSelectedNote(ev.target.labels[0].innerHTML)
        }

    }

    return (
        <CheckboxWrapper>
            <Input 
                id = {`ckeckbox${num}`}
                type="checkbox" 
                onChange = {checkboxHandler}
                checked
            />
            <Label htmlFor = {`ckeckbox${num}`}>{note}</Label>
        </CheckboxWrapper>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSelectedNote: (note) => dispatch(selectNote(note)),
        removeSelectedNote: (note) => dispatch(unselectNote(note))
    }
}


export default connect(null, mapDispatchToProps)(CheckboxBankNote);