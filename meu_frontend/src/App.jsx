import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './pages/login.page';
import Dashboard from './pages/dashboard.page';
import Equipe from './pages/equipe.page';
import Projetos from './pages/projetos.page';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/projetos" element={<Projetos />} />
      </Routes>
    </Router>
  );
};

export default App;
