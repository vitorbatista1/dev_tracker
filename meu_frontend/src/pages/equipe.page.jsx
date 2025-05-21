import React from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const membros = [
  {
    id: 1,
    nome: 'Admin User',
    email: 'admin@devtracker.com',
    funcao: 'Administrador',
    dataEntrada: '31/12/2022',
  },
  {
    id: 2,
    nome: 'Project Manager',
    email: 'pm@devtracker.com',
    funcao: 'Gerente de Projeto',
    dataEntrada: '01/01/2023',
  },
  {
    id: 3,
    nome: 'Developer One',
    email: 'dev1@devtracker.com',
    funcao: 'Desenvolvedor',
    dataEntrada: '02/01/2023',
  },
  {
    id: 4,
    nome: 'Developer Two',
    email: 'dev2@devtracker.com',
    funcao: 'Desenvolvedor',
    dataEntrada: '03/01/2023',
  },
  {
    id: 5,
    nome: 'Viewer User',
    email: 'viewer@devtracker.com',
    funcao: 'Visualizador',
    dataEntrada: '04/01/2023',
  },
];

const badgeVariant = (funcao) => {
  switch (funcao) {
    case 'Administrador':
      return 'primary';
    case 'Gerente de Projeto':
      return 'info';
    case 'Desenvolvedor':
      return 'secondary';
    case 'Visualizador':
      return 'light';
    default:
      return 'dark';
  }
};

const Equipe = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4" style={{ marginLeft: '200px' }}>
        <Row className="mb-4">
          <Col>
            <h3 className="fw-bold">Equipe</h3>
            <p className="text-muted m-0">Gerencie os membros da sua equipe e suas permissões</p>
          </Col>
          <Col xs="auto" className="d-flex align-items-start justify-content-end">
            <Button variant="primary">
              <FaUserPlus className="me-2" />
              Novo Membro
            </Button>
          </Col>
        </Row>

        <div className="bg-white rounded shadow-sm p-0">
          <Table hover responsive className="mb-0">
            <thead className="table-light text-uppercase small text-muted">
              <tr>
                <th>Membros</th>
                <th>Função</th>
                <th>Data de Entrada</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {membros.map((membro) => (
                <tr key={membro.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                        {membro.nome.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-semibold">{membro.nome}</div>
                        <div className="text-muted small">{membro.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge bg-${badgeVariant(membro.funcao)} px-3 py-1`}>
                      {membro.funcao}
                    </span>
                  </td>
                  <td>{membro.dataEntrada}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <FaEdit className="text-primary cursor-pointer" />
                      <FaTrash className="text-danger cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default Equipe;
