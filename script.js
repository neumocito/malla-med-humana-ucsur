const malla = {
  "I semestre": {
    "Biología Celular y Molecular": [],
    "Química": [],
    "Matemática": [],
    "Lengua y Oratoria": [],
    "Introducción a la Medicina": [],
    "Desempeño Universitario": []
  },
  "II semestre": {
    "Morfofisiología I": ["Biología Celular y Molecular"],
    "Anatomía General": ["Biología Celular y Molecular"],
    "Introducción a la Investigación": ["Lengua y Oratoria"],
    "Bioquímica": ["Química"],
    "Redacción General": ["Lengua y Oratoria"],
    "Realidad Nacional": ["Desempeño Universitario"]
  },
  "III semestre": {
    "Morfofisiología II": ["Morfofisiología I", "Anatomía General"],
    "Inmunología": ["Morfofisiología I"],
    "Estadística General": ["Matemática"],
    "Filosofía": [],
    "Genética Médica": ["Biología Celular y Molecular"],
    "Educación Ambiental": []
  },
  "IV semestre": {
    "Morfofisiología III": ["Morfofisiología II", "Anatomía General"],
    "Fisiopatología I": ["Morfofisiología II"],
    "Desarrollo y Crecimiento": ["Biología Celular y Molecular"],
    "Infectología básica": ["Morfofisiología I", "Bioquímica"],
    "Bioética": ["Introducción a la Medicina", "Redacción General"]
  },
  "V semestre": {
    "Morfofisiología IV": ["Morfofisiología III"],
    "Fisiopatología II": ["Fisiopatología I"],
    "Salud Mental": ["Filosofía"],
    "Fundamentos de Medicina Intercultural": ["Filosofía", "Realidad Nacional"],
    "Bioestadística": ["Estadística General"]
  },
  "VI semestre": {
    "Anatomía Patológica": ["Fisiopatología II"],
    "Farmacología": ["Infectología básica"],
    "Semiología": ["Morfofisiología III", "Fisiopatología I", "Inmunología"],
    "Semiología basada en Simulación": ["Morfofisiología III", "Fisiopatología I"],
    "Apoyo al diagnóstico": ["Morfofisiología IV"]
  },
  "VII semestre": {
    "Metodología de la Investigación": ["Bioestadística"],
    "Epidemiología": ["Bioestadística"],
    "Nutrición y Prácticas Saludables": ["Farmacología"],
    "Seguridad del Paciente y Calidad de la Atención Médica": ["Bioética"],
    "Medicina Interna I": ["Semiología", "Semiología basada en Simulación", "Anatomía Patológica"]
  },
  "VIII semestre": {
    "Medicina Basada en la Evidencia": ["Metodología de la Investigación", "Epidemiología"],
    "Salud Pública": ["Epidemiología"],
    "Atención Primaria en Salud": ["Epidemiología"],
    "Medicina Interna II": ["Medicina Interna I"]
  },
  "IX semestre": {
    "Tesis I": ["Medicina Basada en la Evidencia"],
    "Medicina Interna III": ["Medicina Interna II"],
    "Simulación Clínica Integrada": ["Medicina Interna II"],
    "Terapéutica": ["Medicina Interna II"],
    "Medicina Legal": ["Semiología", "Semiología basada en Simulación"]
  },
  "X semestre": {
    "Análisis de Casos I": ["Medicina Interna III", "Simulación Clínica Integrada", "Terapéutica"],
    "Cirugía": ["Medicina Interna III", "Simulación Clínica Integrada"],
    "Simulación Quirúrgica": ["Medicina Interna III", "Simulación Clínica Integrada"],
    "Cuidados Paliativos y Rehabilitación Física": ["Terapéutica"],
    "Ecografía": ["Semiología", "Apoyo al diagnóstico"]
  },
  "XI semestre": {
    "Tesis II": ["Tesis I"],
    "Pediatría": ["Medicina Interna III"],
    "Simulación Pediátrica": ["Simulación Clínica Integrada"],
    "Ginecología y Obstetricia": ["Cirugía"],
    "Simulación Gineco-Obstetra": ["Simulación Quirúrgica"]
  },
  "XII semestre": {
    "Análisis de Casos II": ["Análisis de Casos I"],
    "Gerencia en Salud": ["Atención Primaria en Salud"],
    "Informática Biomédica": ["Atención Primaria en Salud"],
    "Pre-Internado": [
      "Biología Celular y Molecular", "Química", "Matemática", "Lengua y Oratoria", "Introducción a la Medicina", "Desempeño Universitario",
      "Morfofisiología I", "Anatomía General", "Introducción a la Investigación", "Bioquímica", "Redacción General", "Realidad Nacional",
      "Morfofisiología II", "Inmunología", "Estadística General", "Filosofía", "Genética Médica", "Educación Ambiental",
      "Morfofisiología III", "Fisiopatología I", "Desarrollo y Crecimiento", "Infectología básica", "Bioética",
      "Morfofisiología IV", "Fisiopatología II", "Salud Mental", "Fundamentos de Medicina Intercultural", "Bioestadística",
      "Anatomía Patológica", "Farmacología", "Semiología", "Semiología basada en Simulación", "Apoyo al diagnóstico",
      "Metodología de la Investigación", "Epidemiología", "Nutrición y Prácticas Saludables", "Seguridad del Paciente y Calidad de la Atención Médica",
      "Medicina Interna I", "Medicina Basada en la Evidencia", "Salud Pública", "Atención Primaria en Salud", "Medicina Interna II",
      "Tesis I", "Medicina Interna III", "Simulación Clínica Integrada", "Terapéutica", "Medicina Legal",
      "Análisis de Casos I", "Cirugía", "Simulación Quirúrgica", "Cuidados Paliativos y Rehabilitación Física", "Ecografía",
      "Tesis II", "Pediatría", "Simulación Pediátrica", "Ginecología y Obstetricia", "Simulación Gineco-Obstetra",
      "Análisis de Casos II", "Gerencia en Salud", "Informática Biomédica"
    ]
  },
  "XIII y XIV semestre": {
    "Trabajo de Investigación": ["Pre-Internado"],
    "Internado en Cirugía": ["Pre-Internado"],
    "Internado en Ginecología y Obstetricia": ["Pre-Internado"],
    "Internado en Medicina": ["Pre-Internado"],
    "Internado en Pediatría": ["Pre-Internado"]
  }
};

const contenedor = document.getElementById("contenedor-malla");
const estado = JSON.parse(localStorage.getItem("estadoMalla") || "{}");

function esDesbloqueado(nombre) {
  for (const semestre of Object.values(malla)) {
    for (const [ramo, requisitos] of Object.entries(semestre)) {
      if (ramo === nombre) {
        return requisitos.every(req => estado[req]);
      }
    }
  }
  return false;
}

function construirMalla() {
  contenedor.innerHTML = "";
  for (const [semestre, ramos] of Object.entries(malla)) {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    const h2 = document.createElement("h2");
    h2.textContent = semestre;
    divSem.appendChild(h2);

    for (const [ramo, requisitos] of Object.entries(ramos)) {
      const divRamo = document.createElement("div");
      divRamo.textContent = ramo;
      divRamo.className = "ramo";

      if (estado[ramo]) {
        divRamo.classList.add("aprobado");
      } else if (!esDesbloqueado(ramo) && requisitos.length > 0) {
        divRamo.classList.add("bloqueado");
      }

      divRamo.addEventListener("click", () => {
        if (divRamo.classList.contains("bloqueado")) return;

        estado[ramo] = !estado[ramo];
        localStorage.setItem("estadoMalla", JSON.stringify(estado));
        construirMalla();
      });

      divSem.appendChild(divRamo);
    }

    contenedor.appendChild(divSem);
  }
}

construirMalla();
