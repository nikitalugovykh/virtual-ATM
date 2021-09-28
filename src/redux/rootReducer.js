import { ADD_AMOUNT, 
        CLEAN_AMOUNT, 
        REQUIRED_TOTAL_AMOUNT, 
        ADD_AMOUNT_NUMPAD, 
        SELECT_NOTE, 
        UNSELECT_NOTE, 
        SHOW_INFO 
} from "./actionTypes"

export const rootReducer = (state, action) => {
    switch(action.type) {
        case ADD_AMOUNT:
            return {...state, validInput: action.payload}
        case ADD_AMOUNT_NUMPAD:
            return {...state, validInput: state.validInput + action.payload}
        case CLEAN_AMOUNT: 
            return {...state, validInput: ''}
        case REQUIRED_TOTAL_AMOUNT:
            return {...state, requiredTotalAmount: action.payload}
        case SELECT_NOTE:
            return {...state, selectedNotes: [...state.selectedNotes, action.payload].sort((a,b) => b - a)}
        case UNSELECT_NOTE:
            return {...state, selectedNotes: state.selectedNotes.filter(item => item !== action.payload)}
        case SHOW_INFO:
            return {...state, showInfo: !state.showInfo}
        default:
            return state
    }
}