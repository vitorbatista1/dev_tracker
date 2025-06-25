import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContainerWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
`;

const StyledCard = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #2575fc;
  border: none;
  &:hover {
    background-color: #1a5ed9;
  }
`;

const StyledFormLabel = styled(Form.Label)`
  font-weight: 600;
  color: #444;
`;

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
      setMensagem('Email ou senha inválidos!');
      setTipoMensagem('danger');
    }
  };

  return (
    <ContainerWrapper>
      <StyledCard>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <StyledFormLabel>Email</StyledFormLabel>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSenha" className="mb-3">
            <StyledFormLabel>Senha</StyledFormLabel>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>

          <StyledButton variant="primary" type="submit">
            Entrar
          </StyledButton>
        </Form>

        {mensagem && (
          <Alert variant={tipoMensagem} className="mt-3">
            {mensagem}
          </Alert>
        )}
      </StyledCard>
    </ContainerWrapper>
  );
};

export default LoginForm;
