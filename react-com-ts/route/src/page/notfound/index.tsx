import { Link } from 'react-router-dom'

export function NotFound(){
    return(
        <div>
        <h1>Página não encontrada</h1>
        <Link to="/">Voltar a página Home</Link>
    </div>
    )

}