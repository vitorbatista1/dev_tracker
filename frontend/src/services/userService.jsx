import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function login(email, senha) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, senha });
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erro ao fazer login');
  }
}

export async function logout() {
  try {
    const res = await axiosInstance.post('/logout');
    localStorage.removeItem('token');
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Erro ao fazer logout');
  }
}

export async function listarUsuarios() {
  try {
    const res = await axiosInstance.get('/');
    return res.data;
  } catch (error) {
    throw new Error(`Erro ao buscar usuários: ${error.response?.status || error.message}`);
  }
}

export async function criarUsuario(usuario) {
  try {
    const res = await axiosInstance.post('/', usuario);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

export async function atualizarUsuario(id, dados) {
  try {
    const res = await axiosInstance.put(`/${id}`, dados);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}

export async function deletarUsuario(id) {
  try {
    await axiosInstance.delete(`/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}
