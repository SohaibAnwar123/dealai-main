import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/index';
import HomeNdaLanding from '../pages/nda/Home';
import Payment from '../pages/nda/Payment';
import SignUp from '../pages/nda/SignUp';
import CreateAccount from '../pages/nda/CreateAccount';
import Arrow from '../components/Arrow';
import AddFirm from '../pages/nda/AddFirmInfo';
import Dashboard from '../pages/nda/DashBoard';
import HomeNda from '../pages/nda/HomeNda';
import Preferences from '../pages/nda/Preferences';
import PreviousNDA from '../pages/nda/PreviousNda';
import CounterPartiesPage from '../pages/nda/CounterParties';
import DetailNDA from '../pages/nda/DetailPages';
import NotFound from '../pages/nda/notFound';
import PrivateRoute from '../pages/nda/PrivateRoute'; // Adjust the path as needed
import SignUpAccount from '../components/SignUpAccount';
import Settings from '../components/Settings';
import ProfileSetting from '../components/Profile';
import LogoutModal from '../components/LogoutModel';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const NdaRouters = ({ isLoggedIn }) => {
  return (
    <Routes>
      <Route path="homeNdaLanding" element={<HomeNdaLanding />} />
      <Route path="payment" element={<PrivateRoute element={<Payment />} isLoggedIn={isLoggedIn} />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="createAccount" element={<SignUpAccount />} />
      <Route path="arrow" element={<PrivateRoute element={<Arrow />} isLoggedIn={isLoggedIn} />} />
      <Route path="addFirm" element={<PrivateRoute element={<AddFirm />} isLoggedIn={isLoggedIn} />} />
      <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} isLoggedIn={isLoggedIn} />} />
      <Route path="homeNda" element={<PrivateRoute element={<HomeNda />} isLoggedIn={isLoggedIn} />} />
      <Route path="preferences" element={<PrivateRoute element={<Preferences />} isLoggedIn={isLoggedIn} />} />
      <Route path="previous-nda" element={<PrivateRoute element={<PreviousNDA />} isLoggedIn={isLoggedIn} />} />
      <Route path="counterParties" element={<PrivateRoute element={<CounterPartiesPage />} isLoggedIn={isLoggedIn} />} />
      <Route path="detailNDA" element={<PrivateRoute element={<DetailNDA />} isLoggedIn={isLoggedIn} />} />
      <Route path="profileLayout" element={<PrivateRoute element={<ProfileSetting />} isLoggedIn={isLoggedIn} />} />
      <Route path="payment" element={<PrivateRoute element={<ProfileSetting />} isLoggedIn={isLoggedIn} />} />
      <Route path="settings" element={<PrivateRoute element={<Settings />} isLoggedIn={isLoggedIn} />} />
      <Route path="logoutOut" element={<PrivateRoute element={<LogoutModal />} isLoggedIn={isLoggedIn} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


export { Routers, NdaRouters };