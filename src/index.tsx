import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ModalProvider } from './providers/ModalProvider';
import { PopupProvider } from './providers/PopupProvider';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'store/store';
import MainCalendar from './components/calendar/MainCalendar';

import './index.scss';

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <StoreProvider store={store}>
    <ModalProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </ModalProvider>
  </StoreProvider>, rootElement);


// const App = () => {
//     return (
//         <div className="app-container">
//             <MainCalendar />
//         </div>
//     );
// };

// ReactDOM.render(<App />, document.getElementById('root'));