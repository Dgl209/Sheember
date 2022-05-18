import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { GoodsState, ModalState } from './context';

function App() {
  return (
    <ModalState>
      <GoodsState>{useRoutes(routes)}</GoodsState>
    </ModalState>
  );
}

export default App;
