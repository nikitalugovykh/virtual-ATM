import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App/App';
import { createGlobalStyle } from 'styled-components';
import { rootReducer } from './redux/rootReducer';
import { LimitAmount } from './logic';


const GlobalStyle = createGlobalStyle`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
    margin: 0;
    padding:0;
} 

  html, body {
    height: 100%;
  }
  #root {
    display:flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    max-width: 1440px;
  }
`

// Вводить количество купюр по номиналу соответственно 50,100,200,500,1000,2000,5000
const limits = new LimitAmount(854,857,696,356,279,147,73);


const INITIALSTATE = {
  validInput: '',
  requiredTotalAmount: '',
  selectedNotes: [],
  showInfo: false,
  limits,
  givenMoney: {},
  showAlert: {
    state: false,
    text: ''
  },
  balance: 0

}

const store = createStore(rootReducer,INITIALSTATE, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <GlobalStyle/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
