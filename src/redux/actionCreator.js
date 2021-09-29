import { 
    ADD_AMOUNT, 
    CLEAN_AMOUNT, 
    REQUIRED_TOTAL_AMOUNT, 
    ADD_AMOUNT_NUMPAD, 
    SELECT_NOTE, 
    UNSELECT_NOTE, 
    SHOW_INFO, 
    GIVEN_MONEY, 
    SHOW_ALERT, 
    UPDATE_BALANCE,
    CLEAN_SELECT_NOTE,
    UPDATE_CHECKBOX_STATUS
} from "./actionTypes"

export const addAmount = (payload) => {
    return  {
        type: ADD_AMOUNT,
        payload
    }
} 
export const addAmountNumPad = (payload) => {
    return  {
        type: ADD_AMOUNT_NUMPAD,
        payload
    }
} 
export const cleanAmount = () => {
    return  {
        type: CLEAN_AMOUNT,
    }
} 
export const requiredTotalAmount = (payload) => {
    return  {
        type: REQUIRED_TOTAL_AMOUNT,
        payload
    }
} 
export const selectNote = (payload) => {
    return  {
        type: SELECT_NOTE,
        payload
    }
} 
export const cleanSelectNote = () => {
    return  {
        type: CLEAN_SELECT_NOTE,
        
    }
} 
export const unselectNote = (payload) => {
    return  {
        type: UNSELECT_NOTE,
        payload
    }
} 
export const showInfo = () => {
    return  {
        type: SHOW_INFO,
    }
} 

export const givenMoney = (payload) => {
    return  {
        type: GIVEN_MONEY,
        payload
    }
} 

export const showAlert = (text) => {
    return  {
        type: SHOW_ALERT,
        text
    }
} 

export const updateBalance = (total) => {
    return  {
        type: UPDATE_BALANCE,
        total
    }
}

