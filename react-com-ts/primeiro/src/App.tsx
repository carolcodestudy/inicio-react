import { useState } from 'react'
//Componente principal
const App = ()=>{

  interface DateUser{
    userName : string,
    userRol : string
  }

  const [user, setUser] = useState<DateUser>({
    userName : "visitante!",
    userRol : ""
  })

  function handleLogin(){
    setUser({
      userName : "Carol",
      userRol : "TI"
    })
  }
  function handleLogout(){
    setUser({
      userName : "visitante!",
      userRol : ""
    })
  }

  //JSX é o que retornanmos para o HTML
  return(
    <div>
              <h1>Olá {user?.userName}</h1>
              <h2>{user?.userRol}</h2>
        <button onClick={handleLogin}>Entrar</button>
        <br /> <br />
        <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
export default App
