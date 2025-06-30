import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../services/userService';

// Animação suave ao entrar na tela
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContainerWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 20px;
`;

const StyledCard = styled.div`
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 420px;
  animation: ${fadeInUp} 0.6s ease;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 32px;
  font-weight: bold;
  color: #333333;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #2575fc;
  border: none;
  font-weight: 600;
  letter-spacing: 1px;
  transition: 0.3s ease;

  &:hover {
    background-color: #1a5ed9;
    transform: scale(1.02);
  }
`;

const StyledFormLabel = styled(Form.Label)`
  font-weight: 600;
  color: #444444;
  margin-bottom: 6px;
`;

const StyledInput = styled(Form.Control)`
  border-radius: 10px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  box-shadow: none;

  &:focus {
    border-color: #2575fc;
    box-shadow: 0 0 0 0.2rem rgba(37, 117, 252, 0.25);
  }
`;

const StyledAlert = styled(Alert)`
  text-align: center;
  font-weight: 500;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      setMensagem(err.message);
      setTipoMensagem('danger');
    }
  };

  return (
    <ContainerWrapper>
      <StyledCard>
        <Title>Bem-vindo de volta</Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-4">
            <StyledFormLabel>Email</StyledFormLabel>
            <StyledInput
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSenha" className="mb-4">
            <StyledFormLabel>Senha</StyledFormLabel>
            <StyledInput
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Form.Group>
          <StyledButton type="submit">Entrar</StyledButton>
        </Form>
        {mensagem && (
          <StyledAlert variant={tipoMensagem} className="mt-3">
            {mensagem}
          </StyledAlert>
        )}
      </StyledCard>
    </ContainerWrapper>
  );
};

export default LoginForm;
