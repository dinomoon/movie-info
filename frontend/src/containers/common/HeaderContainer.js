import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../components/common/Header';

const HeaderContainer = ({ match }) => {
  const url = match.url;
  const type = url === '/login' ? 'login' : 'register';
  return <Header type={type} />;
};

export default withRouter(HeaderContainer);
