import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from 'react-bootstrap';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

const badgeVariant = (departamento) => {
  switch (departamento) {
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
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [novoMembro, setNovoMembro] = useState({
    nome: '',
    email: '',
    departamento: 'Desenvolvedor',
    senha: '',
  });

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        setMembros(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembros();
  }, []);

  const handleNovoMembroChange = (e) => {
    const { name, value } = e.target;
    setNovoMembro((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMembro = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoMembro),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Erro ${response.status}: ${errorBody}`);
    }

    const fetchResponse = await fetch('http://localhost:8080/api/users');
    const data = await fetchResponse.json();
    setMembros(data);
    setShowModal(false);
    setNovoMembro({
      nome: '',
      email: '',
      departamento: 'Desenvolvedor',
      senha: '',
    });
  } catch (err) {
    alert(`Erro ao adicionar membro: ${err.message}`);
    console.error(err);
  }
};

  if (loading) {
    return (
      <div className="d-flex">
        <Sidebar />
        <Container fluid className="p-4" style={{ marginLeft: '200px' }}>
          <p>Carregando membros...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex">
        <Sidebar />
        <Container fluid className="p-4" style={{ marginLeft: '200px' }}>
          <p className="text-danger">Erro: {error}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4" style={{ marginLeft: '200px' }}>
        <Row className="mb-4">
          <Col>
            <h3 className="fw-bold">Equipe</h3>
            <p className="text-muted m-0">
              Gerencie os membros da sua equipe e suas permissões
            </p>
          </Col>
          <Col xs="auto" className="d-flex align-items-start justify-content-end">
            <Button variant="primary" onClick={() => setShowModal(true)}>
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
              {membros.map((membro, index) => (
                <tr key={membro.id ?? index}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '36px', height: '36px' }}
                      >
                        {membro.nome ? membro.nome.charAt(0) : '?'}
                      </div>
                      <div>
                        <div className="fw-semibold">{membro.nome}</div>
                        <div className="text-muted small">{membro.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${badgeVariant(membro.departamento)} px-3 py-1`}
                    >
                      {membro.departamento}
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

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Novo Membro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={novoMembro.nome}
                  onChange={handleNovoMembroChange}
                  placeholder="Digite o nome"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={novoMembro.email}
                  onChange={handleNovoMembroChange}
                  placeholder="Digite o email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Função</Form.Label>
                <Form.Select
                  name="departamento"
                  value={novoMembro.departamento}
                  onChange={handleNovoMembroChange}
                >
                  <option>Administrador</option>
                  <option>Gerente de Projeto</option>
                  <option>Desenvolvedor</option>
                  <option>Visualizador</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="senha"
                  value={novoMembro.senha}
                  onChange={handleNovoMembroChange}
                  placeholder="Digite a senha"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddMembro}>
              Adicionar Membro
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Equipe;
