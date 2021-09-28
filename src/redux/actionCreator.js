import { ADD_AMOUNT, CLEAN_AMOUNT, REQUIRED_TOTAL_AMOUNT, ADD_AMOUNT_NUMPAD, SELECT_NOTE, UNSELECT_NOTE, SHOW_INFO } from "./actionTypes"

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