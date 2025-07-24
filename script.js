// script.js

const malla = document.getElementById('malla');
const estado = JSON.parse(localStorage.getItem('estadoMalla') || '{}');

// Aquí irá el objeto con todos los cursos y sus requisitos
const cursos = {
  // Ejemplo (sólo un fragmento de muestra):
  "Biología Celular y Molecular": [],
  "Química": [],
  "Matemática": [],
  "Lengua y Oratoria": [],
  "Introducción a la Medicina": [],
  "Desempeño Universitario": [],

  "Morfofisiología I": ["Biología Celular y Molecular"],
  "Anatomía General": ["Biología Celular y Molecular"],
  "Introducción a la Investigación": ["Lengua y Oratoria"],
  "Bioquímica": ["Química"],
  "Redacción General": ["Lengua y Oratoria"],
  "Realidad Nacional": ["Desempeño Universitario"],
  // Agrega el resto de cursos aquí con sus requisitos...
};

function crearCurso(nombre) {
  const div = document.createElement('div');
  div.className = 'ramo';
  div.textContent = nombre;

  const requisitos = cursos[nombre] || [];

  const puedeActivarse = () => requisitos.every(req => estado[req]);

  const actualizarEstado = () => {
    const aprobado = estado[nombre];
    div.classList.toggle('aprobado', aprobado);
    div.classList.toggle('bloqueado', !aprobado && !puedeActivarse());
  };

  div.onclick = () => {
    if (!puedeActivarse()) return;
    estado[nombre] = !estado[nombre];
    localStorage.setItem('estadoMalla', JSON.stringify(estado));
    actualizarTodos();
  };

  actualizarEstado();
  return div;
}

function actualizarTodos() {
  malla.innerHTML = '';
  const semestres = [
    ["Biología Celular y Molecular", "Química", "Matemática", "Lengua y Oratoria", "Introducción a la Medicina", "Desempeño Universitario"],
    ["Morfofisiología I", "Anatomía General", "Introducción a la Investigación", "Bioquímica", "Redacción General", "Realidad Nacional"],
    // Agrega el resto de semestres aquí...
  ];

  semestres.forEach((ramos, i) => {
    const divSemestre = document.createElement('div');
    divSemestre.className = 'semestre';
    const titulo = document.createElement('h2');
    titulo.textContent = `Semestre ${i + 1}`;
    divSemestre.appendChild(titulo);

    ramos.forEach(ramo => divSemestre.appendChild(crearCurso(ramo)));

    malla.appendChild(divSemestre);
  });
}

actualizarTodos();

