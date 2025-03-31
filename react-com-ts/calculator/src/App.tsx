import { useState, FormEvent } from 'react'
import logo from './assets/logo-min.png' //Não precisa por o nome pra chamar a imagem entre chaves
import './App.css'

function App() {

  const [gas , setGas] = useState(0)
  const [alcohol , setAlcohol] = useState(0)

  interface ResultProps{
    title : string
    gas_price : string | number
    alcool_price : string | number
  }

  const [info , setInfo] = useState<ResultProps>()

  function Calculation(event : FormEvent){
    event.preventDefault()
    
    let result = (alcohol / gas)

    if(result <= 0.7){
      console.log("Melhor usar álcool!" , result);
      setInfo({
        title : "álcool!",
        gas_price : gas.toLocaleString("pt-br", { style : "currency", currency : "BRL"}),
        alcool_price : alcohol.toLocaleString("pt-br", { style : "currency", currency : "BRL"})
      })
    }
    else{
      console.log("Melhor usar gasolina!" , result);
      setInfo({
        title : "gasolina!",
        gas_price : gas.toLocaleString("pt-br", { style : "currency", currency : "BRL"}),
        alcool_price : alcohol.toLocaleString("pt-br", { style : "currency", currency : "BRL"})
      })
    }
  }

  return (
      <div>
          <main className='container'>

            <img src={logo} className='logo' alt="Logo da calculadora para gasolina ou litro" />

            <h1 className='title'>Qual melhor opção?</h1>

            <form className='form' onSubmit={Calculation}>
              <label>Álcool (preço por L):</label>
                <input type="number" className='input' min= "1" step="0.01" value={alcohol} onChange={(e) => {setAlcohol(Number(e.target.value))}} required />
               
                <label>Gasolina (preço por L):</label>
                  <input type="number" className='input' min="1" step="0.01" value={gas} onChange={(e) => {setGas(Number(e.target.value))}} required />
               
                <input type="submit" className='input-submit' value="Calcular" title='Calcular' />
            </form>

            {info && Object.keys(info).length > 0 &&(
              <section className="section-result">
              <h2>Compensa usar {info.title}</h2>
              <span>Álcool {info.alcool_price}</span>
              <span>Gasolina {info.gas_price}</span>
              </section>
            )}
            
          </main>
      </div>
  )
}

export default App
