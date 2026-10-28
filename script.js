const STORAGE_KEY = 'mi-malla-ie-ucr-v1';
const estados = { pendiente: 'Pendiente', curso: 'En curso', aprobado: 'Aprobado' };
let mostrarRequisitos = false;
let progreso = cargarProgreso();
const grid = document.getElementById('curriculumGrid');
const toast = document.getElementById('toast');
let toastTimer;

function cargarProgreso() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function guardarProgreso() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso)); }
  catch { mostrarToast('No se pudo guardar en este navegador.'); }
}
function estadoCurso(curso) { return progreso[curso.id] || 'pendiente'; }
function requisitosCumplidos(curso) {
  return curso.requisitos.every(id => progreso[id] === 'aprobado');
}
function cursoPorId(id) { return cursos.find(c => c.id === id); }
function crearMalla() {
  grid.innerHTML = '';
  for (let anio = 1; anio <= 4; anio++) {
    const columna = document.createElement('section');
    columna.className = 'year-column';
    const encabezado = document.createElement('h2');
    encabezado.className = 'year-title';
    encabezado.textContent = `Año ${anio}`;
    columna.appendChild(encabezado);
    const semestres = document.createElement('div');
    semestres.className = 'semester-pair';
    for (let semestre = 1; semestre <= 2; semestre++) {
      const caja = document.createElement('div');
      caja.className = 'semester';
      const titulo = document.createElement('h3');
      titulo.textContent = `Semestre ${semestre}`;
      caja.appendChild(titulo);
      const lista = document.createElement('div');
      lista.className = 'course-list';
      const cursosSemestre = cursos.filter(c => c.anio === anio && c.semestre === semestre);
      cursosSemestre.forEach(curso => lista.appendChild(crearTarjeta(curso)));
      if (!cursosSemestre.length) {
        const vacio = document.createElement('p'); vacio.className = 'empty-semester'; vacio.textContent = 'Agrega cursos en cursos.js'; lista.appendChild(vacio);
      }
      caja.appendChild(lista);
      semestres.appendChild(caja);
    }
    columna.appendChild(semestres);
    grid.appendChild(columna);
  }
}
function crearTarjeta(curso) {
  const estado = estadoCurso(curso);
  const bloqueado = curso.requisitos.length > 0 && !requisitosCumplidos(curso) && estado !== 'aprobado';
  const tarjeta = document.createElement('button');
  tarjeta.type = 'button';
  tarjeta.className = `course-card ${estado}${bloqueado ? ' locked' : ''}`;
  tarjeta.setAttribute('aria-label', `${curso.nombre}. Estado: ${estados[estado]}${bloqueado ? '. Tiene requisitos pendientes' : ''}`);
  const nombre = document.createElement('span'); nombre.className = 'course-name'; nombre.textContent = curso.nombre;
  const pie = document.createElement('span'); pie.className = 'course-meta';
  pie.textContent = `${curso.creditos} créditos` + (bloqueado ? ' · 🔒' : estado === 'aprobado' ? ' · ✓' : estado === 'curso' ? ' · ◷' : '');
  tarjeta.append(nombre, pie);
  if (mostrarRequisitos) {
    const requisito = document.createElement('span'); requisito.className = 'course-requirement';
    requisito.textContent = curso.requisitos.length ? 'Requiere: ' + curso.requisitos.map(id => cursoPorId(id)?.nombre || id).join(', ') : 'Sin requisitos registrados';
    tarjeta.appendChild(requisito);
  }
  tarjeta.addEventListener('click', () => {
    if (bloqueado) {
      const faltan = curso.requisitos.filter(id => progreso[id] !== 'aprobado').map(id => cursoPorId(id)?.nombre || id);
      mostrarToast('Primero aprueba: ' + faltan.join(', '));
      return;
    }
    const siguiente = {pendiente:'curso', curso:'aprobado', aprobado:'pendiente'};
    progreso[curso.id] = siguiente[estado];
    guardarProgreso(); renderizar();
    mostrarToast(`${curso.nombre}: ${estados[progreso[curso.id]]}`);
  });
  tarjeta.addEventListener('contextmenu', event => { event.preventDefault(); mostrarToast(curso.nombre + (curso.requisitos.length ? ' · Requisitos: ' + curso.requisitos.map(id => cursoPorId(id)?.nombre || id).join(', ') : ' · Sin requisitos registrados')); });
  return tarjeta;
}
function renderizar() {
  crearMalla();
  const aprobados = cursos.filter(c => estadoCurso(c) === 'aprobado');
  const enCurso = cursos.filter(c => estadoCurso(c) === 'curso');
  const creditosAprobados = aprobados.reduce((s,c) => s + Number(c.creditos || 0), 0);
  const creditosTotales = cursos.reduce((s,c) => s + Number(c.creditos || 0), 0);
  const porcentaje = creditosTotales ? Math.round(creditosAprobados / creditosTotales * 100) : 0;
  document.getElementById('progressPercent').textContent = porcentaje + '%';
  document.getElementById('progressDonut').style.setProperty('--progress', `${porcentaje * 3.6}deg`);
  document.getElementById('progressBar').style.width = porcentaje + '%';
  document.getElementById('earnedCredits').textContent = creditosAprobados;
  document.getElementById('totalCredits').textContent = creditosTotales;
  document.getElementById('approvedCount').textContent = aprobados.length;
  document.getElementById('totalCourses').textContent = cursos.length;
  document.getElementById('quickCredits').textContent = creditosAprobados;
  document.getElementById('remainingCredits').textContent = Math.max(0, creditosTotales - creditosAprobados);
  document.getElementById('quickApproved').textContent = aprobados.length;
  document.getElementById('pendingCount').textContent = cursos.filter(c => estadoCurso(c) === 'pendiente').length;
  const sugeridos = cursos.filter(c => estadoCurso(c) === 'pendiente' && requisitosCumplidos(c)).slice(0, 5);
  const lista = document.getElementById('nextCourses'); lista.innerHTML = '';
  if (!sugeridos.length) {
    const li = document.createElement('li'); li.textContent = '¡Vas muy bien! No hay cursos disponibles en esta muestra.'; lista.appendChild(li);
  } else sugeridos.forEach(c => { const li = document.createElement('li'); const punto = document.createElement('i'); punto.className = 'next-dot'; const texto = document.createElement('span'); texto.textContent = c.nombre; li.append(punto, texto); lista.appendChild(li); });
}
function mostrarToast(mensaje) {
  toast.textContent = mensaje; toast.classList.add('show'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
document.getElementById('requirementsBtn').addEventListener('click', () => {
  mostrarRequisitos = !mostrarRequisitos;
  document.getElementById('requirementsBtn').textContent = mostrarRequisitos ? 'ⓘ Ocultar requisitos' : 'ⓘ Mostrar requisitos';
  renderizar();
});
document.getElementById('exportBtn').addEventListener('click', () => window.print());
document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('¿Seguro que quieres borrar el progreso guardado en este navegador?')) {
    progreso = {}; guardarProgreso(); renderizar(); mostrarToast('Tu malla se restableció.');
  }
});
document.getElementById('dismissNotice').addEventListener('click', () => document.getElementById('demoNotice').classList.add('hidden'));
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active')); link.classList.add('active');
}));
renderizar();
