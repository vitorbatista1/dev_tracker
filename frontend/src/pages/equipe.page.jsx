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
import Sidebar from '../components/siderbar.component';
import { jwtDecode } from 'jwt-decode';


import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
} from '../services/userService';


const badgeVariant = (funcao) => {
  switch (funcao) {
    case 'Administrador': return 'primary';
    case 'Gerente de Projeto': return 'info';
    case 'Desenvolvedor': return 'secondary';
    case 'Visualizador': return 'light';
    default: return 'dark';
  }
};

const Equipe = () => {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [membroParaDeletar, setMembroParaDeletar] = useState(null);
  const [membroParaEditar, setMembroParaEditar] = useState(null);

  const [novoMembro, setNovoMembro] = useState({
    nome: '',
    email: '',
    funcao: 'Desenvolvedor',
    senha: '',
  });

  const token = localStorage.getItem('token');
  const usuarioLogado = token ? jwtDecode(token) : null;
  const funcaoUsuarioLogado = usuarioLogado?.usuarioFuncao || '';

  const formatarData = (data) => {
    if (!data) return '-';
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  };

  const fetchMembros = async () => {
    try {
      const data = await listarUsuarios();
      setMembros(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembros();
  }, []);

  const handleNovoMembroChange = (e) => {
    const { name, value } = e.target;
    setNovoMembro((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditMembroChange = (e) => {
    const { name, value } = e.target;
    setMembroParaEditar((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMembro = async () => {
    try {
      await criarUsuario(novoMembro);
      await fetchMembros();
      setShowModal(false);
      setNovoMembro({
        nome: '',
        email: '',
        funcao: 'Desenvolvedor',
        senha: '',
      });
    } catch (err) {
      alert(`Erro ao adicionar membro: ${err.message}`);
    }
  };

  const confirmarDelete = async () => {
    try {
      await deletarUsuario(membroParaDeletar._id);
      setMembros((prev) => prev.filter((m) => m._id !== membroParaDeletar._id));
      setShowDeleteModal(false);
      setMembroParaDeletar(null);
    } catch (err) {
      alert(`Erro ao deletar membro: ${err.message}`);
    }
  };

  const confirmarEdit = async () => {
    try {
      const { _id, ...dadosEditados } = membroParaEditar;
      await atualizarUsuario(_id, dadosEditados);
      await fetchMembros();
      setShowEditModal(false);
      setMembroParaEditar(null);
    } catch (err) {
      alert(`Erro ao editar membro: ${err.message}`);
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
            <p className="text-muted m-0">Gerencie os membros da sua equipe e suas permissões</p>
          </Col>
          <Col xs="auto" className="d-flex align-items-start justify-content-end">
            {funcaoUsuarioLogado === 'Administrador' && (
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <FaUserPlus className="me-2" />
                Novo Membro
              </Button>
            )}
          </Col>
        </Row>

        <div className="bg-white rounded shadow-sm p-0">
          <Table hover responsive className="mb-0">
            <thead className="table-light text-uppercase small text-muted">
              <tr>
                <th>Membros</th>
                <th>Função</th>
                <th>Data de Entrada</th>
                {funcaoUsuarioLogado === 'Administrador' && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {membros.map((membro) => (
                <tr key={membro._id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                        {membro.nome?.charAt(0) || '?'}
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
                  <td>{formatarData(membro.data_contratacao)}</td>
                  <td>
                    <div className="d-flex gap-3">
                      {funcaoUsuarioLogado === 'Administrador' && (
                        <>
                          <FaEdit
                            className="text-primary cursor-pointer"
                            onClick={() => {
                              setMembroParaEditar(membro);
                              setShowEditModal(true);
                            }}
                          />
                          <FaTrash
                            className="text-danger cursor-pointer"
                            onClick={() => {
                              setMembroParaDeletar(membro);
                              setShowDeleteModal(true);
                            }}
                          />
                        </>
                      )}
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
                <Form.Control type="text" name="nome" value={novoMembro.nome} onChange={handleNovoMembroChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={novoMembro.email} onChange={handleNovoMembroChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Função</Form.Label>
                <Form.Select name="funcao" value={novoMembro.funcao} onChange={handleNovoMembroChange}>
                  <option>Administrador</option>
                  <option>Gerente de Projeto</option>
                  <option>Desenvolvedor</option>
                  <option>Visualizador</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" name="senha" value={novoMembro.senha} onChange={handleNovoMembroChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleAddMembro}>Adicionar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Deseja excluir <strong>{membroParaDeletar?.nome}</strong>?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmarDelete}>Deletar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Membro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="nome" value={membroParaEditar?.nome || ''} onChange={handleEditMembroChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={membroParaEditar?.email || ''} onChange={handleEditMembroChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Função</Form.Label>
                <Form.Select name="funcao" value={membroParaEditar?.funcao || ''} onChange={handleEditMembroChange}>
                  <option>Administrador</option>
                  <option>Gerente de Projeto</option>
                  <option>Desenvolvedor</option>
                  <option>Visualizador</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Nova Senha</Form.Label>
                <Form.Control type="password" name="senha" value={membroParaEditar?.senha || ''} onChange={handleEditMembroChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
            <Button variant="primary" onClick={confirmarEdit}>Salvar</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Equipe;
