const clienteAxios = axios.create({
  baseURL: "https://actividades-api-formativas.herokuapp.com",
});

const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["x-auth-token"];
    window.location = "/index.html";
  }
};

const buscadorMaterias = async (mat) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    tokenAuth(token);
  }
  let nodo = document.getElementById("itemMate");
  let materia = [];
  try {
    let respuesta = await clienteAxios(
      `/api/actividad/materia?nom_materia=${mat}`
    );
    let cant = respuesta.data.materias;
    cant.forEach((mates) => {
      // console.log(mates)
      materia.push(mates);
    });
    nodo.innerHTML = "";
    for (let i = 0; i < materia.length; i++) {
      nodo.innerHTML += `
        <option value="${materia[i]}">${materia[i]}</option>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};

const buscadorCarreras = async (car) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    tokenAuth(token);
  }
  let nodo = document.getElementById("itemCarre");
  let carrera = [];
  try {
    let respuesta = await clienteAxios(
      `/api/actividad/carrera?nom_carrera=${car}`
    );
    let cant = respuesta.data.carreras;
    cant.forEach((carre) => {
      // console.log(carre)
      carrera.push(carre);
    });
    nodo.innerHTML = "";
    for (let i = 0; i < carrera.length; i++) {
      nodo.innerHTML += `
          <option value="${carrera[i]}">${carrera[i]}</option>
        `;
    }
  } catch (error) {
    console.log(error);
  }
};

const obtenerUsuarioAutenticado = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token)
  if (token) {
    tokenAuth(token);
  }
  try {
    const respuesta = await clienteAxios("/api/auth");
    const nombre = respuesta.data.usuario.name;
    const apellido = respuesta.data.usuario.lastname;
    const usuario = nombre + " " + apellido;
    document.getElementById("usuario").innerHTML = usuario;
    document.getElementById("responsable").value = usuario;
  } catch (error) {
    console.log(error);
  }
};

const enviarFormulario = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    tokenAuth(token);
  }
  try {
    const fecha = document.getElementById("fecha").value;
    // const responsable = document.getElementById("responsable").value;
    const semestre = document.getElementById("semestre").value;
    const modulo = document.getElementById("modulo").value;
    const area = document.getElementById("area").value;
    const materia = document.getElementById("materia").value;
    const carrera = document.getElementById("carrera").value;
    const tip_actividad = document.getElementById("tip_actividad").value;
    const desc_actividad = document.getElementById("desc_actividad").value;
    const archivo = document.getElementById("customFile").value;

    const respuesta = await clienteAxios.post('/api/actividad', {
      fecha,
      semestre,
      modulo,
      area,
      materia,
      carrera,
      tip_actividad,
      desc_actividad,
      archivo
    })

    console.log(respuesta)
  } catch (error) {
    console.log(error)
  }
};

document.getElementById("envForm").addEventListener("click", (e) => {
    e.preventDefault()
    enviarFormulario();
});

document.getElementById("materia").addEventListener("input", () => {
  let mat = document.getElementById("materia").value;
  if (!mat) {
    return;
  }
  buscadorMaterias(mat);
});

document.getElementById("carrera").addEventListener("input", () => {
  let car = document.getElementById("carrera").value;
  if (!car) {
    return;
  }
  buscadorCarreras(car);
});

window.addEventListener("load", () => {
  obtenerUsuarioAutenticado();
  // buscadorMaterias()
});
