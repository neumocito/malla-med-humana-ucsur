// Estructura de ramos y sus dependencias
const ramos = {
  "I semestre": {
    "Biología Celular y Molecular": ["Morfofisiología I", "Anatomía general", "Genética Médica", "Desarrollo y crecimiento", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Química": ["Bioquímica", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Matemática": ["Estadística General", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Lengua y Oratoria": ["Introducción a la Investigación", "Redacción General", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Introducción a la Medicina": ["Bioética", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Desempeño Universitario": ["Realidad Nacional", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"]
  },
  "II semestre": {
    "Morfofisiología I": ["Morfofisiología II", "Inmunología", "Morfofisiología III", "Infectología básica", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Anatomía General": ["Morfofisiología II", "Morfofisiología III", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Introducción a la Investigación": ["Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Bioquímica": ["Infectología básica", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Redacción General": ["Bioética", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"],
    "Realidad Nacional": ["Fundamentos de Medicina Intercultural", "Pre-Internado", "Trabajo de Investigación", "Internado en Cirugía", "Internado en Ginecología y Obstetricia", "Internado en Medicina", "Internado en Pediatría"]
  },
  // Puedes continuar con los siguientes semestres...
};

// Estado guardado
let estado = JSON.parse(localStorage.getItem("mallaMedicina") || "{}");

// Crear interfaz
const contenedor = document.getElementById("malla");

for (const [semestre, cursos] of Object.entries(ramos)) {
  const divSem = document.createElement("div");
  divSem.className = "semestre";
  const h2 = document.createElement("h2");
  h2.textContent = semestre;
  divSem.appendChild(h2);

  for (const [materia, dependientes] of Object.entries(cursos)) {
    const div = document.createElement("div");
    div.className = "materia";
    div.textContent = materia;
    div.dataset.nombre = materia;
    div.dataset.dependientes = JSON.stringify(dependientes);
    if (estado[materia]) div.classList.add("aprobado");
    divSem.appendChild(div);
  }

  contenedor.appendChild(divSem);
}

// Desbloqueo dinámico
function actualizarDesbloqueos() {
  const materias = document.querySelectorAll(".materia");

  const aprobadas = new Set(
    [...materias].filter(m => m.classList.contains("aprobado")).map(m => m.dataset.nombre)
  );

  materias.forEach(m => {
    const nombre = m.dataset.nombre;
    let bloqueado = false;

    for (const [sem, cursos] of Object.entries(ramos)) {
      for (const [curso, dependientes] of Object.entries(cursos)) {
        if (dependientes.includes(nombre) && !aprobadas.has(curso)) {
          bloqueado = true;
        }
      }
    }

    if (!estado[nombre]) {
      if (bloqueado) {
        m.classList.add("bloqueado");
      } else {
        m.classList.remove("bloqueado");
      }
    }
  });
}

// Eventos
document.querySelectorAll(".materia").forEach(el => {
  el.addEventListener("click", () => {
    const nombre = el.dataset.nombre;
    el.classList.toggle("aprobado");
    estado[nombre] = el.classList.contains("aprobado");
    localStorage.setItem("mallaMedicina", JSON.stringify(estado));
    actualizarDesbloqueos();
  });
});

actualizarDesbloqueos();
