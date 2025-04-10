import { useState, FormEvent } from 'react'
import './App.css'

function App() {

  const [name , setName] = useState<string>("")
  const [age, setAge] = useState<number>(0)
  const [birth_year , setBirth_Year ] = useState<number>(0)
  const [birth_month , setBirth_Month] = useState<number>(0)
  const [birth_day , setBirth_Day] = useState<number>(0)
  const [flag, setFlag] = useState<boolean>(false)

  const saveName = (e :any) =>{
      setName(e.target.value)   
  }

  const saveYear = (e :any) =>{
    setBirth_Year(e.target.value)   
}

const saveMonth = (e :any) =>{
  setBirth_Month(e.target.value)   
}

const saveDay = (e :any) =>{
  setBirth_Day(e.target.value)   
}

  const Form  = (event : FormEvent) =>{
      event.preventDefault();
      //Adicona o nome e a idade se não estiverem vazios
      if(name !== ""){        
          let my_date : Date = new Date()
          let actual_year : number = my_date.getFullYear()
          let actual_month : number = my_date.getMonth()
          let actual_day : number = my_date.getDate()

        let result_day : number = actual_day - birth_day
        let result_month : number = actual_month - birth_month
        let result_year : number = actual_year - birth_year

        if(result_day != 0 && result_month != 0 && result_year == 0){
            let final_result : number = result_year - 1
            console.log("Você ainda é um bb. Você está com: " , (final_result * - 1) , " mês ou meses.");
            setAge(final_result)
        }
        else if(result_day != 0 && actual_month <= birth_month && result_year > 0){
          let final_result : number = result_year - 1
          
          console.log("Você ainda não fez aniversário neste ano. Você está com: " , final_result , " anos.");
          setAge(final_result)
        }
        else if(result_day != 0 && actual_month >= birth_month && result_year > 0){
          let final_result : number = result_year 
          
          console.log("Você já fez aniversário este ano. Você está com: " , final_result , " anos.");
          setAge(final_result)
        }
        else if(result_day != 0 && result_month == 0 && result_year > 0){
          let final_result : number = result_year - 1
          console.log("Você vai fazer aniversário este mes. Você está com: " , final_result , " anos.");
          setAge(final_result)
        }
        else if(result_day == 0 && result_month != 0 && result_year > 0){
          let final_result : number = result_year
          console.log("Você já está com: " , final_result , " anos.");
          setAge(result_year)
        }
        else{
          console.log("PARABÉNS VOCÊ ESTÁ FAZENDO ANIVERSÁRIO! " , result_year , " anos.");
          setAge(result_year)
        } 
        
      }
  } 
  
  return (
    <>
      <div className="container">
        <h1>Calcule a sua idade!</h1>
        <form className="form" onSubmit={Form}>       
          <input type="text" className='input' onChange={saveName} placeholder='Seu nome...' required/>
          <input type="number" className="input" onChange={saveDay} placeholder='Dia que nasceu'required/>
          <input type="number" className="input" onChange={saveMonth} placeholder='Mês que nasceu'required/>
          <input type="number" className="input" onChange={saveYear} placeholder='Ano que nasceu'required/>
        <button type='submit' onClick={() => setFlag(true)}>Enviar</button>
        </form>
        {flag && ( <span><h2>Olá {name} você tem atualmente {age} anos!</h2></span> )}
      </div>
    </>
  )
}
export default App
