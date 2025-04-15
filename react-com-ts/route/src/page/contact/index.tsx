import { Link } from 'react-router-dom'

export function Contact(){
    return(
        <div>
            <h1>Tela de contatos</h1>
            <p>(84) 0000-0000</p>
            <Link to="/">Página Home</Link>
            <br />
            <Link to="/about">Página About</Link>
        </div>
    )
}