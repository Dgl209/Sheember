import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdsState, AuthState, CabinetItemsState, MainCategoriesState, ModalState, SubCategoriesState } from './context';

function App() {
  return (
    <AuthState>
      <ModalState>
        <MainCategoriesState>
          <SubCategoriesState>
            <CabinetItemsState>
              <AdsState>
                {useRoutes(routes)}
                <ToastContainer />
              </AdsState>
            </CabinetItemsState>
          </SubCategoriesState>
        </MainCategoriesState>
      </ModalState>
    </AuthState>
  );
}

export default App;
