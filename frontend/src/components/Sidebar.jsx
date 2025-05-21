import React from 'react';
import { Button } from 'react-bootstrap';
import { FaFolder, FaUsers, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'; // Adicionei FaTachometerAlt
import { useNavigate } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('nome');

  const handleLogout = () => {
    navigate('/');
  };

  const handleEquipe = () => {
    navigate('/equipe');
  };

  const handleProjetos = () => {
    navigate('/projetos');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header text-center mb-4">
        <h5>{nomeUsuario}</h5>
      </div>

      <div className="sidebar-buttons">
        <Button
          variant="link"
          onClick={handleDashboard}
          className="sidebar-btn"
        >
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </Button>

        <Button
          variant="link"
          onClick={handleProjetos}
          className="sidebar-btn"
        >
          <FaFolder className="sidebar-icon" /> Projetos
        </Button>

        <Button
          variant="link"
          onClick={handleEquipe}
          className="sidebar-btn"
        >
          <FaUsers className="sidebar-icon" /> Equipe
        </Button>
      </div>

      <Button
        variant="link"
        className="sidebar-btn logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="sidebar-icon" /> Sair
      </Button>
    </div>
  );
};

export default Sidebar;
