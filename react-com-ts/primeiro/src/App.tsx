import { useState } from 'react'

const App = ()=>{
 
//Lista
const [task, setTask] = useState<string[]>([])

//Nova tarefa
const [ newTask, setNewTask ] = useState("")

//Editar tarefa
const [ editTask, setEditTask] = useState({
  enabled : false,
  text : ''
})

const AddTask = () => {
  if(!newTask){
    alert("Nenhuma tarefa adicionada!")
    return
  }
  else{
      if(editTask.enabled){
        //Passa uma função para salvar a tarefa 
        savedEdit()
        return
      }
       //Adicona a tarefa e puxa as tarefas já existentes no useState. Usa o spread operator do JS
       setTask(savedTask => [...savedTask, newTask])
       //Limpa o campo após adicionada a tarefa
       setNewTask("")
  }
}
//Função que vai verificar o item do botão que cliquei pra ver se é aquele mesmo
const DelTask = (deletedTask : string) =>{
  const list_updated = task.filter( (task) => task !== deletedTask )
  console.log("Tarefas restantes " , list_updated);
  //Remove a tarefa
  setTask(list_updated)
}

//Função para editar
const EdiTask = (editedTask : string) =>{
  console.log("Tarefa para editar: " , editedTask);
  //Passar a tarefa escolida para ser editada no input
  setNewTask(editedTask)
  setEditTask({
    enabled : true,
    text : editedTask
  })
}
function savedEdit(){
  //Encontra o index(índice) da tarefa. Observação: para comparar a terafa correspondente ao index, passei editTask com a popriedade text
  const indexTask = task.findIndex((task) => task === editTask.text)
  const list_updated = [...task]
  //Captura o index da tarefa para saber qual vai ser editada e salvada como uma nova tarefa na lista 
  list_updated[indexTask] = newTask
  setTask(list_updated)

  //Significa que a tarefa já foi editada
  setEditTask({
    enabled : false,
    text : ''
  })
}

  return(
  <div>
      <h1>Lista de tarefas</h1>

      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} aria-label='Campo para tarefa' placeholder='Tarefa para lista' />
      <button onClick={AddTask} title="Botão de adicionar ou atualizar">
      {/*Valor ternário para o valor do botão*/ editTask.enabled ? "Atualizar" : "Adicionar" }</button>
      
      <hr />

      {task.map( (iten) =>(
        <section key={iten}><span>{iten} <button onClick={() => EdiTask(iten)} title='Botão de editar'>Editar</button>  <button onClick={ ()=> DelTask(iten) } title='Botão de deletar'>Excluir</button> </span></section>
      ) )} 

      </div>
  )
}
export default App
