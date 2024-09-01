import React, { FC, useEffect } from 'react';
import Calendar from './components/calendar/Calendar';
import { useActions } from './hooks';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainCalendar from './components/calendar/MainCalendar';


import './common.scss';

const App: FC = () => {
  const { getEvents } = useActions();

  useEffect(() => {
    getEvents();
  }, []);
  
  return (
    <Calendar />
  );
}

// const App: React.FC = () => {
//   const isAuthenticated = localStorage.getItem('auth') === 'true';

//   return (
//       <Router>
//           <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<SignUp />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/" element={isAuthenticated ? <MainCalendar /> : <Navigate to="/login" />} />
//           </Routes>
//       </Router>
//   );
// };


export default App;
