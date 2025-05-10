import { Link } from 'react-router-dom'

export function NotFound(){
    return(
        <div>
            <h1>Erro ao acessar a página</h1>
            <p>Volte para página inicial</p> 
            <br />
            <Link to="/">Home</Link>
        </div>
    )
}