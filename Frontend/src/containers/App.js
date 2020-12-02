import React from 'react'
import { Provider } from 'react-redux';
import { store, persistor } from '../store'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import { PersistGate } from 'redux-persist/integration/react'



const App = () => (
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Router>
  </Provider>
);




export default App;
