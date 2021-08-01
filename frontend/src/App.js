import React from 'react';
import { Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import MovieListPage from './pages/MovieListPage';
import MoviePage from './pages/MoviePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Route path="/" component={MovieListPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/movie/:title" component={MoviePage} />
    </>
  );
}

export default App;
