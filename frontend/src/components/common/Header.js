import React from 'react';
import { Link } from 'react-router-dom';

const textMap = {
  login: '회원가입',
  register: '로그인',
};
const Header = ({ type }) => {
  const text = textMap[type];
  return (
    <header>
      <h1 className="title">
        <Link to="/">React Movies</Link>
      </h1>
      <button type="button" className="login-btn">
        <Link to={type === 'login' ? '/register' : '/login'}>{text}</Link>
      </button>
    </header>
  );
};

export default Header;
