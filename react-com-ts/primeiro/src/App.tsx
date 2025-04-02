import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

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

//useEffect
useEffect (()=> {
    //Captura das tarefas com Local storage. Passa a chave
    const tasks_local = localStorage.getItem("key")

    if(tasks_local){
      //Tarefas salvas em string e preciso retorna-las como um array
      setTask(JSON.parse(tasks_local))   
    }
} , [] )

let checkRef = useRef(true);

useEffect( ()=>{

  //Isso evita que o primeiro useEffect seja chamado sem nada na lista
  if(checkRef.current){
    checkRef.current = false
    return
  }

  localStorage.setItem("key", JSON.stringify(task))

  //Sempre que a lista receber novas tarefas o script rodará esse trecho
}, [task] )

//useRef. Precisa saber a que elemento ele vai prestar a referência
const inputRef = useRef<HTMLInputElement>(null)

//Função de adicionar renderizada eficientemente, evita ser chamada (realocada na memória) toda hora
const AddTask = useCallback( ()=>{
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

  //Caso o input receba mudança será executada ou se a lista receber mudança também será executada(função)
}, [newTask, task])

//Função que vai verificar o item do botão que cliquei pra ver se é aquele mesmo
const DelTask = (deletedTask : string) =>{
  const list_updated = task.filter( (task) => task !== deletedTask )
  //Remove a tarefa
  setTask(list_updated)
}

//Função para editar
const EdiTask = (editedTask : string) =>{
  //Passar a tarefa escolhida para ser editada no input
  setNewTask(editedTask)
  setEditTask({
    enabled : true,
    text : editedTask
  })

    //Captura o cursor e põe dentro do input para editar. Verifica se o seu estado está vazio
    inputRef.current?.focus()
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

  setNewTask("")
}

//Evita a perca de performance. O useMemo renderiza esta ação sempre que a lista ganha ou perde tarefa

const taskMemo = useMemo( ()=>{

return task.length

}, [task] )

  return(
  <div>
    
      <h1>Lista de tarefas</h1>

      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} aria-label='Campo para tarefa' placeholder='Tarefa para lista' ref={inputRef} />

      <button onClick={AddTask} title="Botão de adicionar ou atualizar">
      {/*Valor ternário para o valor do botão*/ editTask.enabled ? "Atualizar" : "Adicionar" }</button>
      
      <hr />

      <strong>Números de tarefas: {taskMemo}</strong>

      {task.map( (iten) =>(
        <section key={iten}><span>{iten} <button onClick={() => EdiTask(iten)} title='Botão de editar'>Editar</button>  <button onClick={ ()=> DelTask(iten) } title='Botão de deletar'>Excluir</button> </span></section>
      ) )} 

      </div>
  )
}
export default App
