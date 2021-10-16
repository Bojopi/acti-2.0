const clienteAxios = axios.create({
  baseURL: "https://actividades-api-formativas.herokuapp.com",
});

const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["x-auth-token"];
  }
};

const buscadorMaterias = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    tokenAuth(token);
  }
  const mat = document.getElementById('materia')
  try {
    let respuesta = await clienteAxios(`/api/actividad/materia?nom_materia=${mat}`)
    console.log(respuesta.data.materia)
  } catch (error) {
    console.log(error)
  }

  // let ac = new Awesomeplete(mat, {
  //   list: [],
  //   minChars: 1,
  // })

  // const refrescarLista = () => {
  //   let valorInput =  mat.value
  //   if(!valorInput) return

  //   try {
  //     let respuesta = await clienteAxios("/api/materia")
  //     console.log(respuesta.nom_materia)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // mat.addEventListener('input', () => {
  //   refrescarLista()
  // })
}

// document.addEventListener('DOMContentLoaded', () => {
//     const mat = document.getElementById('materia')

//     let ac = new Awesomeplete(mat, {
//         list = [],
//         minChars: 1
//     })

//     const refrescar = () => {
//         let valMat = mat.value
//         if(!valMat) return
//     }
// })

const obtenerUsuarioAutenticado = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token)
  if (token) {
    tokenAuth(token);
  }
  try {
    const respuesta = await clienteAxios("/api/auth");
    // console.log(respuesta.data.usuario)
    const nombre = respuesta.data.usuario.name;
    const apellido = respuesta.data.usuario.lastname;
    const usuario = nombre + " " + apellido;
    // console.log(usuario)
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
    const responsable = document.getElementById("responsable").value;
    const semestre = document.getElementById("semestre").value;
    const modulo = document.getElementById("modulo").value;
    const area = document.getElementById("area").value;
    const materia = document.getElementById("materia").value;
    const carrera = document.getElementById("carrera").value;
    const tip_actividad = document.getElementById("tip_actividad").value;
    const desc_actividad = document.getElementById("desc_actividad").value;
    const customFile = document.getElementById("customFile").value;

    console.log(responsable);
  } catch {}
};

// document.getElementById('envForm').addEventListener('click', (e) => {
//   //   e.preventDefault()
//     enviarFormulario()
// })

document.getElementById('materia').addEventListener('input', () => {
  buscadorMaterias()
})

window.addEventListener("load", () => {
  obtenerUsuarioAutenticado();
  // buscadorMaterias()
});
