import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1 className="title">
        <Link to="/">React Movies</Link>
      </h1>
      <button type="button" className="login-btn">
        <Link to="/login">로그인</Link>
      </button>
    </header>
  );
};

export default Header;
