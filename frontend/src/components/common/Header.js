import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <header>
      <h1 className="title">
        <Link to="/">React Movies</Link>
      </h1>
      {user ? (
        <div>
          <span className="username">{user.username}</span>
          <button type="button" className="login-btn" onClick={onLogout}>
            <Link to="/">로그아웃</Link>
          </button>
        </div>
      ) : (
        <div className="button-wrapper">
          <button type="button" className="login-btn">
            <Link to="/login">로그인</Link>
          </button>
          <button type="button" className="register-btn">
            <Link to="/register">회원가입</Link>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
