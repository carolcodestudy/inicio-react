import {useContext} from 'react'
import  {UserContext}  from '../../context/user'

export function Footer(){
    const research = useContext(UserContext)
    const { class_students, toCountStudent } = research
    return(
        <div>
            <h4>Footer</h4>
            <h5>Alunos Online:{class_students}</h5>
            <button onClick={() => { toCountStudent() }}>Adicionar aluno</button>
        </div>
    )
}