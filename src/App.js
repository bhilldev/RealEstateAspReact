import react from 'react';
import { Provider } from "react-redux";
import { store } from "./actions/store";
import Houses from './components/Houses';
import { Container } from '@material-ui/core';
import { ToastProvider } from "react-toast-notifications";

function App() {
    return (
      <Provider store={store}>
        <ToastProvider autoDismiss={true}>
          <Container maxWidth="lg">     
              <Houses />
          </Container> 
        </ToastProvider>      
      </Provider>
    );
  }
  
  export default App;