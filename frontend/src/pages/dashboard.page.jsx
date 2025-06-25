import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Button, Badge, Modal, Form
} from 'react-bootstrap';
import {
  FaFolder, FaClock, FaPauseCircle, FaCheckCircle
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const initialProjetos = [
  {
    nome: 'Plataforma de E-commerce',
    descricao: 'Construindo uma plataforma moderna de e-commerce com React e Node.js',
    status: 'Em Andamento',
    membros: 3,
    atualizado: 'há cerca de 2 anos',
  },
  {
    nome: 'Dashboard Interno',
    descricao: 'Criando um painel de análise para uso interno',
    status: 'Em Espera',
    membros: 3,
    atualizado: 'há cerca de 2 anos',
  },
  {
    nome: 'App Bancário Mobile',
    descricao: 'Desenvolvendo um aplicativo bancário seguro para iOS e Android',
    status: 'Planejamento',
    membros: 2,
    atualizado: 'há cerca de 2 anos',
  },
  {
    nome: 'Portal de Saúde',
    descricao: 'Sistema de gerenciamento de pacientes para provedores de saúde',
    status: 'Concluído',
    membros: 3,
    atualizado: 'há cerca de 2 anos',
  },
];

const badgeStatus = {
  'Em Andamento': { variant: 'warning', label: 'Em Andamento' },
  'Planejamento': { variant: 'primary', label: 'Planejamento' },
  'Em Espera': { variant: 'danger', label: 'Em Espera' },
  'Concluído': { variant: 'success', label: 'Concluído' },
};

const Dashboard = () => {
  const [projetos, setProjetos] = useState(initialProjetos);
  const [showModal, setShowModal] = useState(false);
  const [novoProjeto, setNovoProjeto] = useState({
    nome: '',
    descricao: '',
    status: 'Planejamento',
    membros: 1,
    atualizado: 'agora mesmo',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProjeto({ ...novoProjeto, [name]: value });
  };

  const handleAddProjeto = () => {
    setProjetos([novoProjeto, ...projetos]);
    setShowModal(false);
    setNovoProjeto({
      nome: '',
      descricao: '',
      status: 'Planejamento',
      membros: 1,
      atualizado: 'agora mesmo',
    });
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <Container fluid className="p-4" style={{ marginLeft: '200px' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3 className="fw-bold">Dashboard</h3>
            <p className="text-muted">Bem-vindo de volta, Usuário Admin! Aqui está uma visão geral de seus projetos.</p>
          </div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaFolder className="me-2" />
            Novo Projeto
          </Button>
        </div>

        <Row className="mb-5 g-3">
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaFolder className="fs-3 text-primary mb-2" />
                <Card.Title className="h5">Total de Projetos</Card.Title>
                <h4>{projetos.length}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaClock className="fs-3 text-warning mb-2" />
                <Card.Title className="h5">Planejamento</Card.Title>
                <h4>{projetos.filter(p => p.status === 'Planejamento').length}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaPauseCircle className="fs-3 text-danger mb-2" />
                <Card.Title className="h5">Em Espera</Card.Title>
                <h4>{projetos.filter(p => p.status === 'Em Espera').length}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaCheckCircle className="fs-3 text-success mb-2" />
                <Card.Title className="h5">Concluído</Card.Title>
                <h4>{projetos.filter(p => p.status === 'Concluído').length}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Projetos recentes</h5>
              <a href="#" className="text-primary text-decoration-none">Ver todos projetos ↗</a>
            </div>
            <div className="list-group list-group-flush">
              {projetos.map((p, index) => (
                <div key={index} className="list-group-item py-3 d-flex justify-content-between align-items-start">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <strong className="text-primary">{p.nome}</strong>
                      <Badge bg={badgeStatus[p.status].variant}>
                        {badgeStatus[p.status].label}
                      </Badge>
                    </div>
                    <div className="text-muted small">{p.descricao}</div>
                  </div>
                  <div className="text-end">
                    <div className="small text-muted mb-1">{p.membros} membros</div>
                    <div className="small text-muted">{p.atualizado}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Modal de Novo Projeto */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Novo Projeto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Projeto</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={novoProjeto.nome}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do projeto"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descricao"
                  value={novoProjeto.descricao}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={novoProjeto.status}
                  onChange={handleInputChange}
                >
                  <option value="Planejamento">Planejamento</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Em Espera">Em Espera</option>
                  <option value="Concluído">Concluído</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Membros</Form.Label>
                <Form.Control
                  type="number"
                  name="membros"
                  value={novoProjeto.membros}
                  onChange={handleInputChange}
                  min="1"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddProjeto}>
              Adicionar Projeto
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Dashboard;
