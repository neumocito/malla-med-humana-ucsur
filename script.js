const cursos = {
  "Primer semestre": [
    { nombre: "Biología Celular y Molecular" },
    { nombre: "Química" },
    { nombre: "Matemática" },
    { nombre: "Lengua y Oratoria" },
    { nombre: "Introducción a la Medicina" },
    { nombre: "Desempeño Universitario" }
  ],
  "Segundo semestre": [
    { nombre: "Morfofisiología I", requisitos: ["Biología Celular y Molecular"] },
    { nombre: "Anatomía General", requisitos: ["Biología Celular y Molecular"] },
    { nombre: "Introducción a la Investigación", requisitos: ["Lengua y Oratoria"] },
    { nombre: "Bioquímica", requisitos: ["Química"] },
    { nombre: "Redacción General", requisitos: ["Lengua y Oratoria"] },
    { nombre: "Realidad Nacional", requisitos: ["Desempeño Universitario"] }
  ]
  // Agrega más semestres aquí según sea necesario
};

const estado = JSON.parse(localStorage.getItem("estadoCursos") || "{}");

function guardarEstado() {
  localStorage.setItem("estadoCursos", JSON.stringify(estado));
}

function requisitosCumplidos(requisitos) {
  if (!requisitos) return true;
  return requisitos.every(r => estado[r]);
}

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (const [semestre, ramos] of Object.entries(cursos)) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    divSemestre.appendChild(titulo);

    for (const ramo of ramos) {
      const divRamo = document.createElement("div");
      divRamo.textContent = ramo.nombre;
      divRamo.className = "ramo";

      if (!estado[ramo.nombre]) estado[ramo.nombre] = false;

      if (estado[ramo.nombre]) {
        divRamo.classList.add("aprobado");
      } else if (!requisitosCumplidos(ramo.requisitos)) {
        divRamo.classList.add("bloqueado");
      }

      divRamo.onclick = () => {
        if (divRamo.classList.contains("bloqueado")) return;
        estado[ramo.nombre] = !estado[ramo.nombre];
        guardarEstado();
        crearMalla();
      };

      divSemestre.appendChild(divRamo);
    }

    contenedor.appendChild(divSemestre);
  }
}

crearMalla();
