
const malla = {
  "Primer semestre": [
    "Biología Celular y Molecular",
    "Química",
    "Matemática",
    "Lengua y Oratoria",
    "Introducción a la Medicina",
    "Desempeño Universitario"
  ],
  "Segundo semestre": [
    "Morfosiología I",
    "Anatomía General",
    "Introducción a la Investigación",
    "Bioquímica",
    "Redacción General",
    "Realidad Nacional"
  ]
};

function construirMalla() {
  const contenedor = document.getElementById("contenedor-malla");
  contenedor.innerHTML = "";

  for (const [semestre, ramos] of Object.entries(malla)) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    divSemestre.appendChild(titulo);

    ramos.forEach((ramo) => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      divRamo.textContent = ramo;

      if (localStorage.getItem(ramo) === "aprobado") {
        divRamo.classList.add("aprobado");
      }

      divRamo.addEventListener("click", () => {
        divRamo.classList.toggle("aprobado");
        localStorage.setItem(ramo, divRamo.classList.contains("aprobado") ? "aprobado" : "");
      });

      divSemestre.appendChild(divRamo);
    });

    contenedor.appendChild(divSemestre);
  }
}

window.addEventListener("DOMContentLoaded", construirMalla);
