//Arquivo responsável por passar os dados de forma universal no diretório
import { createContext, ReactNode, useState }  from 'react'

interface UserProviderProps{
    children : ReactNode
}

type DateProps = {
    student : string,
    class_students : number,
    toChangeName : (name : string) => void,
    toCountStudent : () => void
}

export const UserContext = createContext({} as DateProps)

function UserProvider({children} : UserProviderProps){
    const [student, setStudent] = useState("Joana")
    const [class_students, setClass_Students] = useState(13)

        //Função para trocar o nome
        function toChangeName(name : string) {
            setStudent(name)
        }

        //Função para contar os estudantes
        function toCountStudent() {
            setClass_Students(class_students => class_students + 1)
        }

    return(
        <UserContext.Provider value = {{ student, class_students, toChangeName, toCountStudent}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserProvider