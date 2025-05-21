import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import '../styles/projetos.style.css';

const projetosData = [
  {
    id: 1,
    nome: 'E-commerce Platform',
    descricao: 'Building a modern e-commerce platform with React.',
    status: 'In Progress',
    equipe: ['A', 'P', 'D'],
    criadoEm: '2023-01-31',
    atualizadoEm: '2023-04-14',
  },
  {
    id: 2,
    nome: 'Mobile Banking App',
    descricao: 'Developing a secure banking application for iOS.',
    status: 'Planning',
    equipe: ['P', 'D'],
    criadoEm: '2023-03-09',
    atualizadoEm: '2023-03-14',
  },
  {
    id: 3,
    nome: 'Internal Dashboard',
    descricao: 'Creating an analytics dashboard for internal use.',
    status: 'On Hold',
    equipe: ['A', 'D', 'V'],
    criadoEm: '2023-01-19',
    atualizadoEm: '2023-03-31',
  },
  {
    id: 4,
    nome: 'Healthcare Portal',
    descricao: 'Patient management system for healthcare providers.',
    status: 'Completed',
    equipe: ['P', 'D', 'D'],
    criadoEm: '2022-11-14',
    atualizadoEm: '2023-02-27',
  },
];

const statusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'in progress':
      return 'info';
    case 'planning':
      return 'warning';
    case 'on hold':
      return 'secondary';
    case 'completed':
      return 'success';
    default:
      return 'dark';
  }
};

const Projetos = () => {
  const [projetos, setProjetos] = useState(projetosData);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = projetosData.filter(
      (projeto) =>
        projeto.nome.toLowerCase().includes(e.target.value.toLowerCase()) ||
        projeto.descricao.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProjetos(filtered);
  };

  const handleNewProject = () => {
    alert('Nova funcionalidade para criar um projeto!');
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4" style={{ marginLeft: '200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Projetos</h3>
          <Button variant="primary" onClick={handleNewProject}>
            <FaPlus className="me-2" />
            Novo Projeto
          </Button>
        </div>

        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Buscar projetos..."
            value={search}
            onChange={handleSearch}
          />
        </Form>

        <Table hover responsive className="mb-0 bg-white rounded shadow-sm">
          <thead className="table-light text-uppercase small text-muted">
            <tr>
              <th>Projeto</th>
              <th>Status</th>
              <th>Equipe</th>
              <th>Criado em</th>
              <th>Última atualização</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((projeto) => (
              <tr key={projeto.id}>
                <td>
                  <div className="fw-semibold">{projeto.nome}</div>
                  <div className="text-muted small">{projeto.descricao}</div>
                </td>
                <td>
                  <span className={`badge bg-${statusVariant(projeto.status)} px-3 py-1`}>
                    {projeto.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    {projeto.equipe.map((membro, i) => (
                      <div
                        key={i}
                        className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}
                      >
                        {membro}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  {new Date(projeto.criadoEm).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td>
                  {new Date(projeto.atualizadoEm).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Projetos;
