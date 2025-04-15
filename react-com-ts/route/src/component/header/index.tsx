import { Link } from 'react-router-dom'

const Header = () =>{
    return(
        <header>
            <h1>Bem vindo ao site!</h1>
            <nav> 
                <Link to="/">Home</Link>
                <Link to="/about">Sobre</Link>
                <Link to="/product">Produto</Link>
                <Link to="/contact">Contato</Link>
             </nav>
        </header>
    )
}

export { Header}