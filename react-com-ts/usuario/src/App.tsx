import { useState } from 'react'
import './App.css'

function App() {

  const [flag, setFlag ] = useState(false)

  return (
    
      <div>

      <h1>Teste de usuário</h1>
      <button onClick={()=> setFlag(true)}>Clique</button>

      {flag && (<div>
        <p>O botão está com true</p>
        <button onClick={()=> setFlag(false)}>Botão false</button>
      </div>)}
     
      </div>
  )
}

export default App
