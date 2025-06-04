import { useContext } from 'react'
import { UserContext } from '../../context/user'

export function Name(){
    const research = useContext(UserContext)
    const { student } = research
    return(
        <div>
            <h3><strong>{student}</strong></h3>
        </div>
    )
}