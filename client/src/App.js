import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ModalState } from './context';

function App() {
  return <ModalState>{useRoutes(routes)}</ModalState>;
}

export default App;
