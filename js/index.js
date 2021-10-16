const clienteAxios = axios.create({
  baseURL: 'https://actividades-api-formativas.herokuapp.com'
})

const tokenAuth = token => {
  if (token) {
      clienteAxios.defaults.headers.common['x-auth-token'] = token
  } else {
      delete clienteAxios.defaults.headers.common['x-auth-token']
  }
}


const obtenerUsuarios = async () => {
  try {
    const respuesta = await axios('https://actividades-api-formativas.herokuapp.com/api/user')
    console.log(respuesta)
  } catch (error) {
    console.log(error)
  }
};

const obtenerUsuarioAutenticado = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  console.log(token)
  if(token) {
    tokenAuth(token)
  }
  try {
    const respuesta = await clienteAxios('/api/auth')
    // console.log(respuesta.data.usuario)
    const nombre = respuesta.data.usuario.name
    const apellido = respuesta.data.usuario.lastname
    console.log(respuesta.data.usuario.name)
  } catch (error) {
    console.log(error)
  }
};

const autenticarUsuario = async () => {
  localStorage.clear()
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const respuesta = await clienteAxios.post('/api/auth',{
      username,
      password
    })
    // const tk = respuesta.data.token
    localStorage.setItem('token', JSON.stringify(respuesta.data.token))
    location.href = '/html/menu.html'
    // obtenerUsuarioAutenticado()
    // console.log(respuesta.data.token)
    // console.log(token)
  } catch (error) {
    console.log(error)
  }
};

document.getElementById('btn-ingresar').addEventListener('click', (e) => {
  e.preventDefault()
  // obtenerUsuarios()
  autenticarUsuario()
})