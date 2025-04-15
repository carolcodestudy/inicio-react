import { Link } from 'react-router-dom'

export function Home(){
    return(
        <div>
            <h1>Esta é a tela Home</h1>
            <Link to= "/about">Acesse a página sobre</Link>
            <br />
            <Link to= "/contact">Acesse o contato</Link>
            <br />
            <Link to= "/product">Acesse o produto</Link>
        </div>
    )
}