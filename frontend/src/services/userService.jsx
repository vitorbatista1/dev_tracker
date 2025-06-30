const API_URL = 'http://localhost:8080/api/users';

export async function listarUsuarios() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Erro ao buscar usuários: ${res.status}`);
  return res.json();
}

export async function criarUsuario(usuario) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function atualizarUsuario(id, dados) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deletarUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}
