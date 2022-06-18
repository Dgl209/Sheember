import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdsState, AuthState, ConstantsState, ModalState } from './context';

function App() {
  return (
    <AuthState>
      <ModalState>
        <ConstantsState>
          <AdsState>
            {useRoutes(routes)}
            <ToastContainer />
          </AdsState>
        </ConstantsState>
      </ModalState>
    </AuthState>
  );
}

export default App;
