import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './pages/login.page';
import Dashboard from './pages/dashboard.page';
import Equipe from './pages/equipe.page';
import Projetos from './pages/projetos.page';
import PrivateRoute from './components/private.route.component';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/equipe"
          element={
            <PrivateRoute>
              <Equipe />
            </PrivateRoute>
          }
        />
        <Route
          path="/projetos"
          element={
            <PrivateRoute>
              <Projetos />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
