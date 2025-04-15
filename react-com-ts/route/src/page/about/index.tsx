import { Link } from 'react-router-dom'

export function About(){
    return(
        <div>
            <h1>Esta é a tela Sobre</h1>
            <Link to= "/">Acesse a página home</Link>
            <br />
            <Link to= "/contact">Acesse o contato</Link>
        </div>
        
    )
}