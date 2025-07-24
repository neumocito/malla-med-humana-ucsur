const malla = document.getElementById('malla');
const estado = JSON.parse(localStorage.getItem('estadoMalla') || {});

// Define cursos y requisitos (fragmento de ejemplo, puedes continuar agregando)
const cursos = {
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
  "Morfofisiología II": ["Anatomía General", "Morfofisiología I"],
  "Inmunología": ["Morfofisiología I"],
  "Estadística General": ["Matemática"],
  "Filosofía": [],
  "Genética Médica": ["Biología Celular y Molecular"],
  "Educación Ambiental": [],
  // ... continúa el resto
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
    ["Morfofisiología II", "Inmunología", "Estadística General", "Filosofía", "Genética Médica", "Educación Ambiental"],
    // ... continúa agregando los 14 semestres + electivos
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
