import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../../context';
import { Login } from '../../../pages';

function Header() {
  const { show } = useContext(ModalContext);

  return (
    <nav className="bg-[#221f1f] text-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="w-4/12 flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Sheember</span>
        </Link>
        <div className="w-4/12 flex justify-end items-center md:order-2">
          <button
            type="button"
            onClick={() =>
              show({
                title: 'Sign in',
                closable: true,
                content: <Login />,
              })
            }
            className="px-4 py-2 rounded hover:bg-[rgba(255,255,255,0.1)]"
            id="user-menu-button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => show({ title: 'Cart', closable: true, content: 'Cart list' })}
            className="px-4 py-2 rounded hover:bg-[rgba(255,255,255,0.1)]"
            id="cart-menu-button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 tracking-[0.075rem] text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent
                 md:border-0 md:hover:border-b md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Sell
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 tracking-[0.075rem] text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent
                 md:border-0 md:hover:border-b md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Messages
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 tracking-[0.075rem] text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent
                 md:border-0 md:hover:border-b md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Buy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
