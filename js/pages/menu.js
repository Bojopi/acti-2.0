const clienteAxios = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://actividades-api-formativas.herokuapp.com",
});

const tokenAuth = (token) => {
  if (token) {
    clienteAxios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete clienteAxios.defaults.headers.common["x-auth-token"];
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
    // console.log(respuesta.data.usuario)
    const nombre = respuesta.data.usuario.name;
    const apellido = respuesta.data.usuario.lastname;
    const usuario = nombre + " " + apellido;
    // console.log(usuario)
    document.getElementById("usuario").innerHTML = usuario;
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", () => {
  obtenerUsuarioAutenticado();
});
