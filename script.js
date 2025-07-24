
document.addEventListener("DOMContentLoaded", () => {
  const cursos = {
    "I": [
      { id: "biocel", nombre: "Biología Celular", abre: [] },
      { id: "quimica", nombre: "Química", abre: [] },
      { id: "matematica", nombre: "Matemática", abre: [] }
    ],
    "II": [
      { id: "anatomia", nombre: "Anatomía", abre: ["biocel"] },
      { id: "bioquimica", nombre: "Bioquímica", abre: ["quimica"] },
      { id: "estadistica", nombre: "Estadística", abre: ["matematica"] }
    ],
    "III": [
      { id: "fisiologia", nombre: "Fisiología", abre: ["bioquimica", "anatomia"] },
      { id: "microbiologia", nombre: "Microbiología", abre: ["bioquimica"] },
      { id: "semiologia", nombre: "Semiología", abre: ["anatomia"] }
    ],
    "IV": [
      { id: "patologia", nombre: "Patología", abre: ["fisiologia"] },
      { id: "farmacologia", nombre: "Farmacología", abre: ["fisiologia"] },
      { id: "inmunologia", nombre: "Inmunología", abre: ["microbiologia"] }
    ],
    "V": [
      { id: "medicina1", nombre: "Medicina I", abre: ["patologia", "farmacologia"] },
      { id: "psiquiatria", nombre: "Psiquiatría", abre: ["semiologia"] },
      { id: "genetica", nombre: "Genética", abre: ["bioquimica"] }
    ],
    "VI": [
      { id: "cirugia1", nombre: "Cirugía I", abre: ["medicina1"] },
      { id: "gineco1", nombre: "Ginecología I", abre: ["medicina1"] },
      { id: "pedia1", nombre: "Pediatría I", abre: ["medicina1"] }
    ],
    "VII": [
      { id: "medicina2", nombre: "Medicina II", abre: ["medicina1"] },
      { id: "infectologia", nombre: "Infectología", abre: ["inmunologia"] },
      { id: "epi1", nombre: "Epidemiología I", abre: ["estadistica"] }
    ],
    "VIII": [
      { id: "cirugia2", nombre: "Cirugía II", abre: ["cirugia1"] },
      { id: "pedia2", nombre: "Pediatría II", abre: ["pedia1"] },
      { id: "saludpub", nombre: "Salud Pública", abre: ["epi1"] }
    ],
    "IX": [
      { id: "gineco2", nombre: "Ginecología II", abre: ["gineco1"] },
      { id: "dermatologia", nombre: "Dermatología", abre: ["medicina2"] },
      { id: "trauma", nombre: "Traumatología", abre: ["cirugia2"] }
    ],
    "X": [
      { id: "geriatria", nombre: "Geriatría", abre: ["medicina2"] },
      { id: "oftalmo", nombre: "Oftalmología", abre: ["dermatologia"] },
      { id: "otorrino", nombre: "Otorrinolaringología", abre: ["dermatologia"] }
    ],
    "XI": [
      { id: "internado1", nombre: "Internado I", abre: ["X"] },
      { id: "admin", nombre: "Administración en Salud", abre: ["saludpub"] },
      { id: "etica", nombre: "Ética Médica", abre: [] }
    ],
    "XII": [
      { id: "internado2", nombre: "Internado II", abre: ["internado1"] },
      { id: "comunidad", nombre: "Trabajo en Comunidad", abre: ["saludpub"] },
      { id: "emergencia", nombre: "Emergencias", abre: ["trauma"] }
    ],
    "XIII": [
      { id: "internado3", nombre: "Internado III", abre: ["internado2"] },
      { id: "proyecto", nombre: "Proyecto de Tesis", abre: ["epi1"] },
      { id: "electivo1", nombre: "Electivo I", abre: [] }
    ],
    "XIV": [
      { id: "internado4", nombre: "Internado IV", abre: ["internado3"] },
      { id: "electivo2", nombre: "Electivo II", abre: ["electivo1"] },
      { id: "sustentacion", nombre: "Sustentación", abre: ["proyecto"] }
    ]
  };

  const contenedor = document.getElementById("contenedor");
  const aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

  function render() {
    contenedor.innerHTML = "";
    for (const semestre in cursos) {
      const div = document.createElement("div");
      div.className = "semestre";
      const h3 = document.createElement("h3");
      h3.textContent = `Semestre ${semestre}`;
      div.appendChild(h3);

      cursos[semestre].forEach((curso) => {
        const el = document.createElement("div");
        el.className = "curso";
        el.textContent = curso.nombre;
        el.dataset.id = curso.id;

        const desbloqueado = curso.abre.every(req => aprobados.includes(req));
        if (!desbloqueado && curso.abre.length > 0) el.classList.add("bloqueado");
        else el.classList.add("desbloqueado");

        if (aprobados.includes(curso.id)) el.classList.add("aprobado");

        el.addEventListener("click", () => {
          if (!el.classList.contains("desbloqueado")) return;
          const index = aprobados.indexOf(curso.id);
          if (index === -1) aprobados.push(curso.id);
          else aprobados.splice(index, 1);
          localStorage.setItem("aprobados", JSON.stringify(aprobados));
          render();
          actualizarProgreso();
        });

        div.appendChild(el);
      });
      contenedor.appendChild(div);
    }
  }

  function actualizarProgreso() {
    const total = Object.values(cursos).flat().length;
    const pct = Math.round((aprobados.length / total) * 100);
    document.getElementById("progreso").textContent = `Progreso: ${pct}%`;
  }

  render();
  actualizarProgreso();
});
