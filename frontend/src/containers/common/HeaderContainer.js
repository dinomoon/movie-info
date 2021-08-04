import React from 'react';
import Header from '../../components/common/Header';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../modules/user';

const HeaderContainer = ({ type }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const onLogout = () => {
    dispatch(logout());
  };

  return <Header type={type} user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
