import React, { useContext } from 'react';
import { ModalContext } from '../../../context';

function Modal() {
  const { modal, hide } = useContext(ModalContext);

  if (!modal.visible) return null;

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto bg-[rgba(0,0,0,0.7)] overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-[600px] h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {modal.title && (
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{modal.title}</h3>
              {modal.closable && (
                <button
                  type="button"
                  onClick={hide}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className="p-6 space-y-6">{modal.content}</div>

          {modal.footerButtons && (
            <div className="flex items-center justify-end px-4 py-2 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              {modal.footerButtons.map((btn) => (
                <button
                  key={btn.text}
                  type={btn.type}
                  onClick={btn.handler}
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300
                   font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  {btn.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
