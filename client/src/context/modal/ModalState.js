import React, { useReducer } from 'react';
import { ModalContext } from './modalContext';
import PropTypes from 'prop-types';
import { ModalReducer } from './modalReducer';
import { HIDE_MODAL, SHOW_MODAL } from '../types';

export const ModalState = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, { visible: false });

  const show = (options) => {
    const { title, closable, content, footerButtons, width } = options;
    dispatch({
      type: SHOW_MODAL,
      payload: { title, closable, content, footerButtons, width },
    });
  };

  const hide = () => dispatch({ type: HIDE_MODAL });

  return (
    <ModalContext.Provider
      value={{
        show,
        hide,
        modal: state,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
