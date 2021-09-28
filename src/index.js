import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App/App';
import { createGlobalStyle } from 'styled-components';
import { rootReducer } from './redux/rootReducer';

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

const INITIALSTATE = {
  validInput: '',
  requiredTotalAmount: '',
  selectedNotes: [],
  showInfo: false

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
