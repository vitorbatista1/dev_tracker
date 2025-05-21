import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@teste.com' && senha === '123456') {
        setMensagem('Login realizado com sucesso!');
        setTipoMensagem('success');
        localStorage.setItem('token', '123456');
        localStorage.setItem('nome', 'Admin');

        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    } else {
        setMensagem('Email ou senha inválidos!');
        setTipoMensagem('danger');
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Card className="p-4 shadow" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSenha" className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Entrar
              </Button>
            </Form>

            {mensagem && (
              <Alert variant={tipoMensagem} className="mt-3">
                {mensagem}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
