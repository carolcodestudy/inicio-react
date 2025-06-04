import { Name } from '../Name'
import { useContext } from 'react'
import { UserContext } from '../../context/user'

export function Student(){
    const research = useContext(UserContext)
    const { class_students, toChangeName } = research
   return(
    <div>
         <h2>Total de alunos: {class_students}</h2>
         <Name/>
         <button onClick={() => toChangeName("Mudei um nome")}>
            Trocar nome
         </button>
    </div>
   )
}