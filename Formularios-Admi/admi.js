const API_BASE = "http://localhost:3000"; // o el que uses

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const txt = await res.text().catch(()=> '');
    throw new Error(`HTTP ${res.status} ${res.statusText} :: ${txt}`);
  }
  return res.json();
}

async function loadLandingForEdit() {
  try {
    const data = await fetchJSON(`${API_BASE}/landing`);
    // Mapea EXACTO a tus nombres del backend
    document.getElementById('logoInput').value = data.logoUrl || '';
    document.getElementById('tituloInput').value = data.title || '';
    document.getElementById('descripcionInput').value = data.description || '';
  } catch (err) {
    console.error('Error real /landing:', err);
    alert('Error al cargar los datos del hero.');
  }
}

async function updateHero() {
  const body = {
    logoUrl: document.getElementById('logoInput').value.trim(),
    title: document.getElementById('tituloInput').value.trim(),
    description: document.getElementById('descripcionInput').value.trim(),
  };
  try {
    await fetchJSON(`${API_BASE}/landing`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(body),
    });
    alert('Hero actualizado correctamente.');
  } catch (err) {
    console.error('PUT /landing error:', err);
    alert('Error al actualizar el hero.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadLandingForEdit();
  document.getElementById('btnUpdateHero')?.addEventListener('click', updateHero);
});
