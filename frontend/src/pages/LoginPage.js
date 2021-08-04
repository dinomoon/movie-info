import React from 'react';
import LoginContainer from '../containers/auth/LoginContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const LoginPage = () => {
  return (
    <>
      <HeaderContainer />
      <LoginContainer />
    </>
  );
};

export default LoginPage;
