//Componente principal
const App = ()=>{
  //JSX é o que retornanmos para o HTML
  return(
    <div>
      <h1>My project</h1>
      <Student name = "Ana Carolina" age={24}/>

      <Student name = "Josemar" age={43}/>
    </div>
  )
}

export default App

//Criar interface para por um valor nas propriedades isso é necessário para que o ts entenda o que quero
interface MyName{
  name : string
  age : number
}

function Student({ name, age } : MyName){
  return(
    <h2>Nome: {name} <br/> Idade: {age}</h2>
  )
}