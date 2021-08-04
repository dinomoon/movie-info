import React from 'react';

const textMap = {
  login: '로그인',
  register: '회원가입',
};
const AuthForm = ({ type, form, onChange, onSubmit }) => {
  const text = textMap[type];
  return (
    <div className="authform-container">
      <h2 className="authform-title">{text}</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">아이디</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          placeholder="홍길동"
          onChange={onChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          placeholder="******"
          onChange={onChange}
        />
        {type === 'register' && (
          <>
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={form.passwordConfirm}
              placeholder="******"
              onChange={onChange}
            />
          </>
        )}
        <button type="submit">{text}</button>
      </form>
    </div>
  );
};

export default AuthForm;
